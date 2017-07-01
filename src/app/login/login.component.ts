import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router} from '@angular/router';
import { CoolSessionStorage } from 'angular2-cool-storage';


@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  mode = 'Observable';
  user: any = {};
  submitted = false;
  sessionStorage: CoolSessionStorage;

  constructor(private userAuthService: UserAuthService,
              public router: Router,
			  sessionStorage: CoolSessionStorage  ) {
			  this.sessionStorage = sessionStorage;}

  ngOnInit() {
  }


  onSubmit() {
    this.userAuthService.authenticateUser(this.user)
                     .subscribe(
                       user => {

                         this.user = user;
						              this.sessionStorage.setItem("user",JSON.stringify(this.user.obj));
                          if ( this.user.success ) {
                            this.router.navigate(['home']);
                          }
                       },
                       error =>  this.errorMessage = <any>error);

  console.log(this.user);
  this.submitted = true; }

}
