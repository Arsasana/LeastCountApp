import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router} from '@angular/router';
import { CoolSessionStorage } from 'angular2-cool-storage';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  mode = 'Observable';
  user: any = {};
  submitted = false;
  sessionStorage: CoolSessionStorage;
  userImg: any;
 
constructor(private userAuthService: UserAuthService,
              public router: Router,
			  sessionStorage: CoolSessionStorage  ) { 
			  this.sessionStorage = sessionStorage;}

  ngOnInit() {
  }
  
  

  onSubmit() { 
  
   this.userAuthService.registerUser(this.user)
                     .subscribe(
                       user => {
                         this.user = user;
						 this.successMessage = this.user.message;
                          if ( this.user.success ) {
							setTimeout(() => {  
                            this.router.navigate(['login']);
							},5000);
                          }
                       },
                       error =>  this.errorMessage = <any>error);

  console.log(this.user);
  this.submitted = true;}
}
