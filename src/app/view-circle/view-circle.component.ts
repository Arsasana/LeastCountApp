import { Component, OnInit } from '@angular/core';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-circle',
  templateUrl: './view-circle.component.html',
  styleUrls: ['./view-circle.component.css']
})
export class ViewCircleComponent implements OnInit {
	
	/* circles = [{
            "name": "friends",
            "_id": {
                "$oid": "593d496e953e23801af37d91"
            },
            "isActive": false,
            "members": [
			{
				"playerId":"593daab845a35df8148d0a80",
				"name":"Ravinder"
			},
			{
				"playerId":null,
				"name":"Sindhu"
			},
			{
				"playerId":"593daab845a35df8148d0a80",
				"name":"Bharat"
			},
			{
				"playerId":null,
				"name":"Karthik"
			},
			{
				"playerId":"593daab845a35df8148d0a80",
				"name":"Nishant"
			}
            ]
        },{
            "name": "Family",
            "_id": {
                "$oid": "593d496e953e23801af37d91"
            },
            "isActive": false,
            "members": [
			{
				"playerId":"593daab845a35df8148d0a80",
				"name":"Ravinder"
			},
			{
				"playerId":"593daab845a35df8148d0a80",
				"name":"Bharat"
			},
			{
				"playerId":null,
				"name":"Karthik"
			},
			{
				"playerId":"593daab845a35df8148d0a80",
				"name":"Nishant"
			}
            ]
        },{
            "name": "collegues",
            "_id": {
                "$oid": "593d496e953e23801af37d91"
            },
            "isActive": false,
            "members": [
			{
				"playerId":"593daab845a35df8148d0a80",
				"name":"Ravinder"
			},
			{
				"playerId":null,
				"name":"Sindhu"
			}
            ]
        }]; */
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
	  
	  for(let i = 0 ; i < this.circles.length; i++){
		  this.isEditCircle[i] = false;
		  this.addNewMember[i] = false;
	  }
	  
	  this.circles = this.user.circles
  }
  

  
    removeMember(index){
	  console.log(index);
	  this.circles[this.circleIndex].members.splice(index,1);
  }
  
  deleteCircle(index){
	  this.circles.splice(index,1);
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
	  //implement save circle
	  
	  this.data.email = this.user.email
	  this.data.circleId = this.circles[index]._id;
	  this.data.circle = this.circles[index];
	  this.data.circle.membersCount = this.data.circle.members.length;
	  console.log(this.data);
	  this.userService.saveCircle(this.data)
                     .subscribe(
                      resp => {
						 console.log(resp)
                         this.user = resp.resultObj;
						 console.log(this.user);
						  //this.sessionStorage.setItem("user",JSON.stringify(this.user));
                          if ( resp.success ) {
                            //this.router.navigate(['profile']);
                          }
                       },
                       error =>  this.errorMessage = <any>error);
  }
  
  addMember(){
	  // implement add member
  }
  
  openInput(index){
	  console.log(index);
	  this.addNewMember[index] = true;
  }

}
