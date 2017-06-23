import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-circle',
  templateUrl: './view-circle.component.html',
  styleUrls: ['./view-circle.component.css']
})
export class ViewCircleComponent implements OnInit {
	
	circles = [{
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
        }];
		
		circleMembers = [];
		showMembers = false;
		prevIndex = 0;
		circleIndex = 0;
		isEditCircle = false;
		addNewMember = false;
		
  constructor() { }

  ngOnInit() {
	  
  }
  
  listMembers(index){
	  
	  this.circleIndex = index;
	  console.log(this.circles[index].members);
	  this.circleMembers = this.circles[index].members;
	  if(this.prevIndex === index){
			if(this.showMembers){
				this.showMembers = false;
			}else{
				this.showMembers = true;
			}
	  }else{
		  this.prevIndex = index;
		  if(!this.showMembers){
				this.showMembers = true;
			}
	  }
  }
  
    removeMember(index){
	  console.log(index);
	  this.circles[this.circleIndex].members.splice(index,1);
	  //this.circleMembers.splice(index,1);
  }
  
  deleteCircle(){
	  
  }
  
  editCircle(index){
	  this.circleIndex = index;
	  this.isEditCircle = true;
  }
  
  saveCircle(){
	  this.isEditCircle =false;
  }
  
  openInput(index){
	  console.log(index);
	  this.addNewMember = true;
  }

}
