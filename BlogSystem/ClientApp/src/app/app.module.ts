import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { 
  MatButtonModule, 
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule 
} from '@angular/material';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts.component';
import { WebService } from './web.service';
import { HttpModule } from '@angular/http';
import { NewPostComponent } from './new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { UserComponent } from './user.component';

var routes = [
  {
  path:'',
  component: HomeComponent
},
{
  path:'posts',
  component: PostsComponent
},
{
  path:'posts/:name',
  component: PostsComponent
},
{
  path:'register',
  component: RegisterComponent
},
{
  path:'login',
  component: LoginComponent
},
{
  path:'user',
  component: UserComponent
}
];

@NgModule({
  declarations: [ 
    AppComponent,
    PostsComponent,
    NewPostComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule,
    HttpModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
