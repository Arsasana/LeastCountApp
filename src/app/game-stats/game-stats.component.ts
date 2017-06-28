import { Component, OnInit } from '@angular/core';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnInit {
	
	errorMessage: string;
	mode = 'Observable';
	sessionStorage: CoolSessionStorage;
	user: any = {};
	game: any = {};

   constructor(sessionStorage: CoolSessionStorage, private router: Router, private userService: UserService, private gameService: GameService) {
        this.sessionStorage = sessionStorage;   
    }

  ngOnInit() {
	  
	   let loggedUser = this.sessionStorage.getItem('user');
	  if (loggedUser) {
		this.user = JSON.parse(loggedUser);
	  } else {
		  this.user = null;
	  }
	  
	   this.game = this.gameService.getGameStats();
	   console.log(this.game);
  }

}
