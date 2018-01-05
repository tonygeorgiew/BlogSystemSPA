import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';
import { MatSnackBar } from '@angular/material';
import {AuthService} from './auth.service'; 

@Injectable()
export class WebService{
    BASE_URL = 'http://localhost:51107/api';

    private postStore = [];

    private postSubject = new Subject();    

    posts = this.postSubject.asObservable();
    constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService){
        this.getPosts();
    }

         getPostsFor(user){ 
            user = (user) ? '/' + user : '';
             this.http.get(this.BASE_URL + '/posts' + user).subscribe(response => {
                this.postStore = response.json();
                this.postSubject.next(this.postStore);
             }, error =>{
                this.errorHandler("Unable to get messages");
             });
    }

    async getPosts(){   
        try {       
            var response = await this.http.get(this.BASE_URL + '/posts').toPromise();
            this.postStore = response.json();   
        } catch (error) {
           this.errorHandler("Unable to get messages");
        }
    }

    async sendPost(message){
        try {
            var response = await this.http.post(this.BASE_URL + '/posts', message).toPromise();
            this.postStore.push(response.json());
            this.postSubject.next(this.postStore);
        } catch (error) {
            this.errorHandler("Unable to post message");
        }
       
    }

    getUser(){
        return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res=>res.json());
    }

    saveUser(userData){
        return this.http.post(this.BASE_URL + '/users/me', userData,this.auth.tokenHeader).map(res=>res.json());
    }

    private errorHandler(error){
        console.error(error);
            this.sb.open(error, 'Close', {duration: 3000});
    }
}   