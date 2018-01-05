import { Component } from '@angular/core';
import { WebService } from './web.service';
@Component({
    selector: 'user',
    template:
    '<mat-card class="card">'+
    '<mat-input-container> <input matInput [(ngModel)]="model.firstName" placeholder="First Name"> </mat-input-container>'+
    '<mat-input-container> <input matInput [(ngModel)]="model.lastName" placeholder="Last Name"> </mat-input-container>'+
    '<button mat-raised-button color="primary" (click)="saveUser(model)"> Save Changes </button>'+
    '</mat-card>'
})

export class UserComponent {
    constructor(private webService: WebService) {}


    model = {
        firstName: '',
        lastName: ''
    }
    ngOnInit(){
        this.webService.getUser().subscribe(res=>{
            this.model.firstName = res.firstName;
            this.model.lastName = res.lastName;
        })
    }

    saveUser(userData){
        this.webService.saveUser(userData).subscribe();
    }
}