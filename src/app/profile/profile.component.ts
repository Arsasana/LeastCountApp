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
	gameHistory:any = {};
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
	  
	  this.gameHistory=[{
		  "name":"Awesome",
		  "players":['Karan','Vinod','Sumanth'],
		  "winner":"Karan"
	  },{
		  "name":"Sunday Match",
		  "players":['Gautham','Raj','Balu','pawan','Kalyan'],
		  "winner":"pawan"
	  },{
		  "name":"Three showdown",
		  "players":['Mahesh','Brahmi','30 years Industry'],
		  "winner":"30 years Industry"
	  },{
		  "name":"Friendly Match",
		  "players":['Bablu','Arjun','Karan','sam','Kajal'],
		  "winner":"Kajal"
	  },{
		  "name":"WorldCup",
		  "players":['pawan','Gautham','Kajal'],
		  "winner":"Gautham"
	  }]
	  
  }
  
  logout(){
	  if(this.user){
		  this.sessionStorage.removeItem('user');
		  this.router.navigate(['login']);
	  }
  }

}
