import { Component, OnInit } from '@angular/core';
import { LoginModel }    from './login';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
   model = new LoginModel('','');
  submitted = false;
  onSubmit() { this.submitted = true; }

}
