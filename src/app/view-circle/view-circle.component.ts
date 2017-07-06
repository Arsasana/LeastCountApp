import { Component, OnInit } from '@angular/core';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AutoCompleteService} from '../auto-complete.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-view-circle',
  templateUrl: './view-circle.component.html',
  styleUrls: ['./view-circle.component.css']
})
export class ViewCircleComponent implements OnInit {
	
	
		playerNames = [];
		playerDetails = [];
		circles = [];
		errorMessage: string;
		mode = 'Observable';
		sessionStorage: CoolSessionStorage;
		circleIndex = 0;
		isEditCircle = [];
		addNewMember = [];
		user: any = {};
		data: any = {};
		desc = "Here goes the description about the circle will limit this to 140 characters";
		private subscription: Subscription;
		
  constructor(sessionStorage: CoolSessionStorage, private router: Router, private userService: UserService, private autoCompleteService: AutoCompleteService) {
        this.sessionStorage = sessionStorage;   
    }

  ngOnInit() {
	  
	   let loggedUser = this.sessionStorage.getItem('user');
	  if (loggedUser) {
		this.user = JSON.parse(loggedUser);
	  } else {
		  this.user = null;
	  }
	  
	  for(let i = 0 ; i < this.circles.length; i++){
		  this.isEditCircle[i] = false;
		  this.addNewMember[i] = false;
	  }
	  
	  this.circles = this.user.circles;
	  
	  this.subscription = this.autoCompleteService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'updatePlayerDetailsInViewCircle') {
        console.log(res.value);
        // perform your other action from here
		this.playerDetails = res.value;
			this.playerNames = [];
		for(let i = 0 ; i < this.playerDetails.length; i++){
			this.playerNames.push(this.playerDetails[i].name);
		}
		
		let newMember: any = {};
			newMember.name = this.playerDetails[0].name;
			newMember.playerId = this.playerDetails[0].playerId;
			
		this.circles[this.playerDetails[0].circleIndex].members.push(newMember);
      }
    });
  }
  

  
    removeMember(index){
	  console.log(index);
	  this.circles[this.circleIndex].members.splice(index,1);
  }
  
  deleteCircle(index){
	  
	  this.data.circle = this.circles[index];
	   console.log(this.user);
	  this.userService.deleteCircle(this.data,this.user.email)
                     .subscribe(
                      resp => {
						 console.log(resp);
                         this.user = resp.doc;
						 console.log(this.user);
						  this.sessionStorage.setItem("user",JSON.stringify(this.user));
                          if ( resp.success ) {
                            //this.router.navigate(['profile']);
                          }
						  this.circles.splice(index,1);
						  this.ngOnInit();
                       },
                       error =>  this.errorMessage = <any>error);
	
  }
  
  editCircle(index){
	  this.circleIndex = index;
	  if(this.isEditCircle[index]){
		  this.isEditCircle[index] = false;
	  }else{
		  this.isEditCircle[index] = true;
	  }
  }
  
  saveCircle(index){
	  
	  this.data.circle = this.circles[index];
	  this.data.circle.desc = this.desc;
	  this.data.circle.membersCount = this.data.circle.members.length;
	  console.log(this.data);
	  this.userService.saveCircle(this.data,this.user.email)
                     .subscribe(
                      resp => {
						 console.log(resp)
                         this.user = resp.doc;
						 console.log(this.user);
						  this.sessionStorage.setItem("user",JSON.stringify(this.user));
                          if ( resp.success ) {
                            //this.router.navigate(['profile']);
                          }
                       },
                       error =>  this.errorMessage = <any>error);
		this.isEditCircle[index] = false;			   
  }
  
  addMember(){
	  // implement add member
  }
  
  openInput(index){
	  console.log(index);
	  this.addNewMember[index] = true;
  }

}
