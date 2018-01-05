import { Component } from '@angular/core';
import { PostsComponent } from './posts.component';
import { NewPostComponent } from './new-post.component';
import { NavComponent } from './nav.component';


@Component({
  selector: 'home',
  template:     
  '<new-post> </new-post>' +
  '<posts> </posts>',
  styleUrls: ['./app.component.css']
})
export class HomeComponent {

}