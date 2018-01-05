import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
    BASE_URL = 'http://localhost:51107/auth';
    TOKEN_KEY = 'token';
    NAME_KEY = 'name';
    constructor(private http: Http, private router: Router){
    }


    get name(){
        return localStorage.getItem(this.NAME_KEY);
    }


    get tokenHeader(){
        var header = new Headers({'Authorization' : 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
        return new RequestOptions({headers: header});
    }

    get isAuthenticated(){
       
        return !!localStorage.getItem(this.TOKEN_KEY);
    }   

    login(loginData){
        this.http.post(this.BASE_URL + '/login', loginData).subscribe(res=>{
            this.authenticate(res);
        })
    }

    register(user){
        delete user.confirmPassword;
        this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
            this.authenticate(res);
        });
    }

    logout(){
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.NAME_KEY);
    }

    authenticate(res){
  var authResponse = res.json();

            if(!authResponse.token)
            return;
            
            localStorage.setItem(this.TOKEN_KEY, res.json().token)
            localStorage.setItem(this.NAME_KEY, res.json().firstName)
            this.router.navigate(['/'])
    }


}