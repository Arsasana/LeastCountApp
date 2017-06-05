import { Injectable } from '@angular/core';

@Injectable()
export class PlayerNameService {
	private playerNames = [];

  constructor() { }

  addPlayer(playerName){
	  this.playerNames.push(playerName);
  } 
  
  getPlayer(){
	  return this.playerNames;
  }
  
}
