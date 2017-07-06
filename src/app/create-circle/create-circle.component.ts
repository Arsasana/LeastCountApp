import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AutoCompleteService} from '../auto-complete.service';
import { UserService} from '../user.service';
import { Subscription } from 'rxjs/Subscription';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-circle',
  templateUrl: './create-circle.component.html',
  styleUrls: ['./create-circle.component.css']
})
export class CreateCircleComponent implements OnInit {
	
	circle: any = {};
	errorMessage: string;
	mode = 'Observable';
	disablePlayerNameField = false;
	playerDetails = [];
	playerNames = [];
	user: any = {};
	userDetails: any = {};
	sessionStorage: CoolSessionStorage;
	private subscription: Subscription;

  constructor(private autoCompleteService: AutoCompleteService,
			  private userService: UserService,
			  private router: Router,
			  sessionStorage: CoolSessionStorage)
			  { 		  
			  this.sessionStorage = sessionStorage;  
			  }

  ngOnInit() {
	  
	  let loggedUser = this.sessionStorage.getItem('user');
	  if (loggedUser) {
		this.user = JSON.parse(loggedUser);
				this.playerNames.push(this.user.firstName+" "+this.user.lastName);
	  } else {
		  this.user = null;
	  }
	  
	  this.subscription = this.autoCompleteService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'updatePlayerDetails') {
        console.log(res.value);
        // perform your other action from here
		
		this.playerDetails = res.value;
			this.playerNames = [];
			this.playerNames.push(this.user.firstName+" "+this.user.lastName);
		for(let i = 0 ; i < this.playerDetails.length; i++){
			this.playerNames.push(this.playerDetails[i].name);
		}
      }
    });
	  
  }
  
  removeMember(index){
	  console.log(index);
	  this.playerNames.splice(index,1);
	  this.playerDetails.splice(index,1);
	  this.autoCompleteService.setPlayerDetails(this.playerDetails);
  }
  
  onSubmit(createCircleForm : NgForm){
	  let playerDetails: any ={};
				playerDetails.name = this.user.firstName+" "+this.user.lastName;
				playerDetails.playerId = this.user._id;
				playerDetails.profilePic = this.user.profilePic;
	  this.playerDetails.push(playerDetails);
	  this.circle.members = this.playerDetails;
	  this.circle.membersCount = this.playerNames.length;
	  console.log(this.circle);
	  this.userDetails.email = this.user.email;
	  this.userDetails.circle = this.circle;
	  this.userService.createCircle(this.userDetails)
                     .subscribe(
                      resp => {
						 console.log(resp)
                         this.user = resp.resultObj;
						 console.log(this.user);
						  this.sessionStorage.setItem("user",JSON.stringify(this.user));
                          if ( resp.success ) {
                            this.router.navigate(['profile']);
                          }
                       },
                       error =>  this.errorMessage = <any>error);
  }

}
