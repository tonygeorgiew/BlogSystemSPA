import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'posts',
    template: 
    '<div *ngFor="let post of webService.posts | async"><mat-card class="card"> <mat-card-title [routerLink]="[postsString, post.author]" style="cursor: pointer">{{post.author}}</mat-card-title> <mat-card-content> {{post.content}} </mat-card-content></mat-card> </div>'
})

export class PostsComponent {
    postsString = "/posts";
    constructor(private webService: WebService, private route: ActivatedRoute) {}

    ngOnInit(){
      var name = this.route.snapshot.params.name;
      this.webService.getPostsFor(name);
      this.webService.getUser().subscribe();
    }
}