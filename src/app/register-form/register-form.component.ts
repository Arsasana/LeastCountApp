import { Component, OnInit } from '@angular/core';
import { RegisterModel }    from './register';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  model = new RegisterModel('','','','',0);
  submitted = false;
  onSubmit() { this.submitted = true;
	console.log(this.model)}
}
