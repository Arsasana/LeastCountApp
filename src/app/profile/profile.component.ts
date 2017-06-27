import { Component, OnInit } from '@angular/core';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	errorMessage: string;
	mode = 'Observable';
	user: any = {};
	gameHistory = [];
	sessionStorage: CoolSessionStorage;

  constructor(sessionStorage: CoolSessionStorage, private router: Router, private userService: UserService) {
        this.sessionStorage = sessionStorage;   
    }

  ngOnInit() {
	  let loggedUser = this.sessionStorage.getItem('user');
	  if (loggedUser) {
		this.user = JSON.parse(loggedUser);
	  } else {
		  this.user = null;
	  }
	  
	  this.userService.getGamesHistory(this.user.email)
                     .subscribe(
                       gameHistory => {
						   console.log(gameHistory.resultObj);
                         this.gameHistory = gameHistory.resultObj;
                       },
                       error =>  this.errorMessage = <any>error);			   
	  
	  /* this.gameHistory=[{
						"_id": "5946bb1683474248249c520d",
						"gameScore": 40,
						"gameName":"awesome",
						"gameOwner": "nishant@leastcount.com",
						"circle": "NA",
						"__v": 0,
						"createdTime": "2017-06-18T17:40:38.540Z",
						"players": [
						  {
						"name": "sita1",
						"fullCount": 4,
						"showCount": 1
						},
						  {
						"name": "sita2",
						"fullCount": 3,
						"showCount": 2
						}
						],
						"winner": "sita2",
						
						"isActive": true
						},
						  {
						"_id": "59469abe5a30b17833981655",
						"gameScore": 40,
						"gameName":"Special",
						"gameOwner": "nishant@leastcount.com",
						"circle": "NA",
						"__v": 0,
						"createdTime": "2017-06-18T15:22:38.229Z",
						"players": [
						  {
						"name": "ram1",
						"fullCount": 4,
						"showCount": 1
						},
						  {
						"name": "ram2",
						"fullCount": 3,
						"showCount": 2
						}
						],
						"winner": "ram2",
						"isActive": true
						},
						  {
						"_id": "59468ffd5a30b17833981654",
						"gameScore": 50,
						"gameName":"Something",
						"gameOwner": "nishant@leastcount.com",
						"circle": "NA",
						"__v": 0,
						"createdTime": "2017-06-18T14:36:45.609Z",
						"players": [
						  {
						"name": "shiva1",
						"fullCount": 4,
						"showCount": 3
						},
						  {
						"name": "shiva2",
						"fullCount": 5,
						"showCount": 3
						}
						],
						"winner": "shiva1",
						"isActive": true
						}]*/
	  
  } 
  
  logout(){
	  if(this.user){
		  this.sessionStorage.removeItem('user');
		  this.router.navigate(['login']);
	  }
  }

}
