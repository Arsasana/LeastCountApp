import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerNameService} from '../player-name.service';
import { GameService} from '../game.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit{

	playerNames = [];
	playerDetails = [];
	game: any = {};
	model: any = {};
	errorMessage: string;
	mode = 'Observable';
	

  ngOnInit() {
  }
  

  constructor(private playerNameService: PlayerNameService,
			  private router: Router, 
			  private gameService: GameService) {
    }

    private addPlayer(playerName : String) {
       
	   let playerDetails: any ={};
		this.playerNames.push(playerName);
		console.log(playerName);
		this.model.playerName = '';
		playerDetails.name = playerName;
		playerDetails.fullCount = 0;
		playerDetails.showCount = 0;
		this.playerDetails.push(playerDetails);
		
    }
  
  onSubmit(gameForm : NgForm){
	  this.playerNameService.setPlayerNames(this.playerNames);
	  this.game.players = this.playerDetails;
	  this.game.playersCount = this.playerNames.length;
	  this.gameService.createGame(this.game)
                     .subscribe(
                      game => {

                         this.game = game;
						 console.log(this.game);
						 this.gameService.setGame(this.game.obj);
                          if ( this.game.success ) {
                            this.router.navigate(['game']);
                          }
                       },
                       error =>  this.errorMessage = <any>error);
  }
}
