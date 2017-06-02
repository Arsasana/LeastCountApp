import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
	
	playerName="";
	model="";	

  constructor() { }

  ngOnInit() {
  }

  addPlayer(){
	  this.playerName = `<li><input type="text" placeholder="playername" name="playername" id="playername" [(ngModel)]="model.playername" #playername="ngModel"><div [hidden]="playername.valid || playername.pristine" class="alert alert-danger">playername is required</div></li>`;
  }
  
}
