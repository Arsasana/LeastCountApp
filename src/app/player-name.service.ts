import { Injectable } from '@angular/core';

@Injectable()
export class PlayerNameService {
	private playerNames = [];
	private gamescore:number =0;
	private gamename:string = ""; 

  constructor() { }

  setPlayerNames(playerNames){
	  this.playerNames = playerNames;
  } 
  
  getPlayerNames(){
	  return this.playerNames;
  }
  
  setGameScore(gameScore){
	  this.gamescore = gameScore;
  }
  
  getGameScore(){
	  return this.gamescore;
  }
  
  setGameName(gameName){
	  this.gamename = gameName;
  }
  
  getGameName(){
	  return this.gamename;
  }
}
