import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerNameService} from '../player-name.service';
import { GameService} from '../game.service';
import { UserService} from '../user.service';
import { CoolSessionStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playerScores = [];
  individualplayerScores = [];
  dummyarray = [];
  singleRoundScore = [];
  playerTotalScore = [];
  model: any = {};
  game: any = {};
  pattern = '^([0-9]|0[0-9]|1[0-9]|2[0-9]|3[0-9]|40|XX|xx|NA|na|SW|sw)$';
  saveGameUrl = 'http://localhost:5000/api/v1.0/game/saveGame/';
  errorMessage: string;
  mode = 'Observable';
  sessionStorage: CoolSessionStorage;
  user: any = {};

  constructor(	sessionStorage: CoolSessionStorage,
                private playerNameService: PlayerNameService,
                private gameService: GameService,
                private userService: UserService,
                private router: Router) {
    this.sessionStorage = sessionStorage;
  }

  ngOnInit() {

    let loggedUser = this.sessionStorage.getItem('user');
    if (loggedUser) {
      this.user = JSON.parse(loggedUser);
    } else {
      this.user = null;
    }

    this.game = this.gameService.getGame();
    if(this.game){
      this.createInitialArrays();
    }else{
      this.router.navigate(['home']);
    }
  }


  createInitialArrays() {
    const sumArr = [];

    for ( let i = 0 ; i < this.game.players.length; i++) {
      sumArr.push([]);
    }

    this.individualplayerScores = sumArr;

  }

  addplayerScores() {
    const length = this.game.players.length;
    const tempArr = this.playerScores;

    for (let i = 0 ; i < tempArr.length; i++) {
      for (let j = 0; j < length; j++ ) {
        this.individualplayerScores[j].push(tempArr[i][j]);
      }
    }

    this.addScoreToGame();
    this.calculateTotalScore();
    this.checkForGameScore();
    this.createInitialArrays();
  }

  calculateTotalScore() {

    const tempArr = this.individualplayerScores;

    for ( let i = 0 ; i < tempArr.length; i++) {
      let sum = 0;
      for ( let j = 0; j < tempArr[i].length; j++ ) {
        if (tempArr[i][j] === 'NA' ||tempArr[i][j] === 'na' || tempArr[i][j] === 'XX' || tempArr[i][j] === 'xx' || tempArr[i][j] === 'SW' || tempArr[i][j] === 'sw') {
          tempArr[i][j] = 0;
          sum += tempArr[i][j];
        } else {
          sum += tempArr[i][j];
        }
      }
      this.playerTotalScore[i] = sum;
    }
  }

  checkForGameScore(){
    for(let i = 0; i < this.game.players.length; i++){
      if(this.playerTotalScore[i] >= this.game.gameScore){
        this.dummyarray[i] = 'NA';
        this.singleRoundScore[i] = 'NA';
      }
    }
  }

  addScoreToGame(){

    const tempArr = this.individualplayerScores;

    for (let i = 0 ; i < tempArr.length; i++) {
      console.log(tempArr[i]);
      this.game.players[i].score = tempArr[i];
    }

    for (let i = 0 ; i < tempArr.length; i++) {
      let showCount = 0;
      let fullCount = 0;

      for(let j = 0; j < tempArr[i].length; j++){

        if(tempArr[i][j] === 40){
          console.log(tempArr[i][j]);
          fullCount++;
        }
        if(tempArr[i][j] === 'SW' || tempArr[i][j] === 'sw'){
          showCount++;
        }
      }

      this.game.players[i].fullCount = fullCount;
      this.game.players[i].showCount = showCount;
    }

    console.log(this.game);

  }

  saveGame(){
    this.saveGameUrl = this.saveGameUrl + this.game._id;
    this.gameService.saveGame(this.game,this.saveGameUrl)
      .subscribe(
        resp => {
          console.log(resp);
        },
        error =>  this.errorMessage = <any>error);
  }

  updateUserStats(){

    let players = this.game.players;
    let playersStats = [];

    for (let i = 0; i < players.length; i++) {
      let stats: any = {};
      if (players[i].playerId !== 0) {

        console.log(players[i].playerId);
        console.log(this.user._id);


        if ( players[i].playerId === this.user._id) {
         stats.gameOwner = this.user.email;
          console.log(this.user.email);
        } else {
          stats.gameOwner = 0;

        }
        stats.fullCount = players[i].fullCount;
        stats.showCount = players[i].showCount;
        stats.playerId = players[i].playerId;
        playersStats.push(stats);
      }
    }

    this.userService.updateUserStats(playersStats)
      .subscribe(
        resp => {
          console.log(resp);
          this.sessionStorage.setItem("user",JSON.stringify(resp.obj));
        },
        error =>  this.errorMessage = <any>error);
    console.log(playersStats);

  }

  checkForWinner(){

    let count = 0;

    for(let i = 0; i < this.game.players.length; i++){
      if(this.dummyarray[i] === "NA"){
        count++;
      }
    }

    if(count === this.game.players.length - 1){
      this.game.winner = this.game.players[0].name;
      let index = 0;
      let minscore = this.playerTotalScore[0];
      for(let i = 0; i < this.game.players.length; i++){
        if(this.playerTotalScore[i] < minscore){
          minscore = this.playerTotalScore[i];
          index = i;

        }
      }
      this.game.winner = this.game.players[index].name;
      this.saveGame();
      this.updateUserStats();
    }
  }

  onBlurMethod(event: any) {
    const playerScore = event.target.value;
    const id = Number(event.target.attributes.id.value);
    this.singleRoundScore = this.singleRoundScore.filter(Boolean);
    if ( playerScore > 40  || playerScore < 0 ) {
      console.log('invalid entry');
    } else if ( playerScore || playerScore === 0 ) {
      if ( this.singleRoundScore.length < this.game.players.length - 1) {
        if (playerScore === 'NA' || playerScore === 'XX' || playerScore === 'xx' || playerScore === 'SW' || playerScore === 'sw') {
          this.singleRoundScore.splice(id, 0, playerScore);
        } else {
          this.singleRoundScore.splice(id, 0, Number(playerScore));
        }
        console.log( 'singleRoundScore : ', this.singleRoundScore);
        console.log( 'length of singleroundarr inside if : ', this.singleRoundScore.length);
      }else {
        console.log('inside else');
        if (playerScore === 'NA' || playerScore === 'XX' || playerScore === 'xx' || playerScore === 'SW' || playerScore === 'sw') {
          this.singleRoundScore.splice(id, 0, playerScore);
        } else {
          this.singleRoundScore.splice(id, 0, Number(playerScore));
        }
        this.playerScores.push(this.singleRoundScore);
        this.singleRoundScore = [];
        this.dummyarray = [];
        this.addplayerScores();
        this.checkForWinner();

      }
    }else {
      console.log('invalid entry');
    }
  }
}
