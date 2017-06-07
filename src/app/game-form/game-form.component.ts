import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerNameService} from '../player-name.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit{

	playerNames = [];
	model:any={};	

  ngOnInit() {
  }
  

  constructor(private playerNameService : PlayerNameService,private router : Router) {
    }

    private addPlayer(playerName : String) {
       
		this.playerNames.push(playerName);
		console.log(playerName);
		console.log(this);
		this.model.playerName = '';
		
    }
  
  onSubmit(gameForm : NgForm){
	  this.playerNameService.setPlayerNames(this.playerNames);
	  console.log(this.playerNames);
	  this.playerNameService.setGameName(gameForm.value.gamename);
	  this.playerNameService.setGameScore(gameForm.value.gamescore);
	  console.log(this.playerNameService.getGameName());
	  console.log(this.playerNameService.getGameScore());
	  this.router.navigate(['/game']);
  }
  
}
