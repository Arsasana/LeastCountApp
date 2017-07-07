import { Component, OnInit } from '@angular/core';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any = {};
  port: Number;
	sessionStorage: CoolSessionStorage;
	
  constructor(sessionStorage: CoolSessionStorage, private router: Router) {
        this.sessionStorage = sessionStorage;   
    }
 
  ngOnInit() {
	  this.port = window.location.port;
	  let loggedUser = this.sessionStorage.getItem('user');
	  if (loggedUser) {
		this.user = JSON.parse(loggedUser);
	  } else {
		  this.user = null;
	  }
  }
  
  start(){
	  if(this.user){
		  this.router.navigate(['game-form']);
	  }else{
		  this.router.navigate(['login']);
	  }
  }

}
