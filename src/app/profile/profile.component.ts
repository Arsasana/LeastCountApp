import { Component, OnInit } from '@angular/core';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user: any = {};
	sessionStorage: CoolSessionStorage;

  constructor(sessionStorage: CoolSessionStorage, private router: Router) {
        this.sessionStorage = sessionStorage;   
    }

  ngOnInit() {
	  let loggedUser = this.sessionStorage.getItem('user');
	  if (loggedUser) {
		this.user = JSON.parse(loggedUser);
	  } else {
		  this.user = null;
	  }
  }
  
  logout(){
	  if(this.user){
		  this.sessionStorage.removeItem('user');
		  this.router.navigate(['login']);
	  }
  }

}
