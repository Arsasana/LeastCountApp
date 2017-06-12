import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { User } from '../user';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 errorMessage: string;
  mode = 'Observable';
  user = new User('','','','','',0,true);
  constructor(private userAuthService: UserAuthService ) { }

  ngOnInit() {
  }
  
  submitted = false;
  onSubmit() {
	 
	  this.userAuthService.authenticateUser(this.user)
                     .subscribe(
                       user => this.user = user,
                       error =>  this.errorMessage = <any>error);
  
  console.log(this.user);
  this.submitted = true; }

}
