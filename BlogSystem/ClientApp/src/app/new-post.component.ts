import { Component } from '@angular/core'
import { WebService } from './web.service'
import { AuthService } from './auth.service'

@Component({
    selector: 'new-post',
    template: 
    '<mat-card class="card">'+
    '   <mat-card-content>'+

    '       <mat-input-container>'+
    '           <textarea [(ngModel)]="newPost.content" matInput placeholder="Message"></textarea>'+
    '       </mat-input-container>'+
    '       <mat-card-actions>'+
    '       <button (click)="post()" mat-button color="primary">Post</button>'+
    '       </mat-card-actions>'+
    '   </mat-card-content>'+   
    '</mat-card>' 
})

export class NewPostComponent { 
    
    constructor(private webService: WebService, private auth: AuthService){}
    
   newPost = {
         author: this.auth.name,
         content: ""
    }
   

    post(){
        this.webService.sendPost(this.newPost);
    }
}