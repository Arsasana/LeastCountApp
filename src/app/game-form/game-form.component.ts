import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerNameService} from '../player-name.service';
import { GameService} from '../game.service';
import { AutoCompleteService} from '../auto-complete.service';
import { Subscription } from 'rxjs/Subscription';
import { CoolSessionStorage } from 'angular2-cool-storage';

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
	sessionStorage: CoolSessionStorage;
	user: any = {};
	errorMessage: string;
	mode = 'Observable';
	disablePlayerNameField = false;
	private subscription: Subscription;
	port: string;
	

  ngOnInit() {
	  this.port = window.location.port;
	  let loggedUser = this.sessionStorage.getItem('user');
		if (loggedUser) {
			this.user = JSON.parse(loggedUser);
			let playerDetails: any ={};
				playerDetails.name = this.user.firstName+" "+this.user.lastName;
				playerDetails.playerId = this.user._id;
				playerDetails.profilePic = this.user.profilePic;
				playerDetails.fullCount = 0;
				playerDetails.showCount = 0;
				this.playerDetails.push(playerDetails);
		} else {
			this.user = null;
		}
	  
this.subscription = this.autoCompleteService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'updatePlayerDetails') {
        console.log(res.value);
        // perform your other action from here
		this.playerDetails = res.value;
			this.playerNames = [];
		for(let i = 0 ; i < this.playerDetails.length; i++){
			this.playerNames.push(this.playerDetails[i].name);
		}
      }
    });
  }
  

  constructor(sessionStorage: CoolSessionStorage,
			  private playerNameService: PlayerNameService,
			  private router: Router, 
			  private gameService: GameService,
			  private autoCompleteService: AutoCompleteService) {
				  this.sessionStorage = sessionStorage;
    }

	
	private addPlayersFromCircle(index: number){
		let circleMembers = this.user.circles[index].members;
		for(let i = 0 ;i < circleMembers.length ; i++){
				let playerDetails: any ={};
				this.playerNames.push(circleMembers[i].name);
				playerDetails.name = circleMembers[i].name;
				playerDetails.playerId = circleMembers[i].playerId;
				playerDetails.profilePic = circleMembers[i].profilePic;
				playerDetails.fullCount = 0;
				playerDetails.showCount = 0;
				if(this.playerDetails[i].playerId === playerDetails.playerId){
					console.log('logged in user already exist in array');
				}else{
				this.playerDetails.push(playerDetails);
				}
		}
		console.log(this.playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.disablePlayerNameField = true;
	}
	
	 removeMember(index){
	  console.log(index);
	  this.playerNames.splice(index,1);
	  this.playerDetails.splice(index,1);
	  this.autoCompleteService.setPlayerDetails(this.playerDetails);
  }
  
 
  
  onSubmit(gameForm : NgForm){
	  this.playerNameService.setPlayerNames(this.playerNames);
	  let tempArr = this.autoCompleteService.getPlayerDetails();
		for(let i = 0 ; i < tempArr.length; i++){
			tempArr[i].fullCount = 0;
			tempArr[i].showCount = 0;
		}
	  this.game.players = tempArr;
	  this.game.playersCount = this.playerNames.length;
	  this.game.gameOwner = this.user.email;
	  console.log(this.game);
	  this.gameService.createGame(this.game,this.port)
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
