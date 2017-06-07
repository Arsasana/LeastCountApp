import { Component, OnInit } from '@angular/core';
import { PlayerNameService} from '../player-name.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
	
	
	//playerNames: any;
	playerNames = ['xxx','yyy','zzz'];
	playerScores = [[10,20,30],[20,30,40]];
	individualPlayerScores=[];
	dummyarray = [];
	singleRoundScore = [];
	playerTotalScore = [];
	gameScore: number;
	gameName: string;
	model:any ={};
	
  constructor(	private playerNameService : PlayerNameService
				) {
	//this.playerNames= this.playerNameService.getPlayer();
	this.gameScore = this.playerNameService.getGameScore();
	this.gameName = this.playerNameService.getGameName();
	this.gameName = "Sunday Special"
	
  }

  ngOnInit() {
	  this.createPlayerScoreArr();
	  console.log(this.individualPlayerScores);
  }


  createPlayerScoreArr(){
	   let sumArr = [];
	  
	  for(let i = 0 ; i < this.playerNames.length;i++){
		  sumArr.push([]);
	  }
	 this.individualPlayerScores = sumArr;
	  
  }
  
  addPlayerScores(){
	   let length = this.playerNames.length;
	   let tempArr = this.playerScores;
	   console.log("tempArr length"+tempArr.length);
	   for(let i = 0 ; i < tempArr.length;i++){
		for(let j = 0; j < length;j++ ){
				 this.individualPlayerScores[j].push(tempArr[i][j]);
		  }
	  }
	   console.log(this.individualPlayerScores);
	   this.calculateTotalScore();
	   this.createPlayerScoreArr();
  }
  
   calculateTotalScore(){
	  let tempArr = this.individualPlayerScores;
	   for(let i = 0 ; i < tempArr.length;i++){
		let sum = 0;
		for(let j = 0; j < tempArr[i].length;j++ ){
				 sum += tempArr[i][j]; 
				
		  }
		   console.log(sum);
		  this.playerTotalScore[i] = sum;
		  console.log(this.playerTotalScore);
	  }
	  	  
  } 
  
  onBlurMethod(playerScore){
	 
	  if(this.singleRoundScore.length < this.playerNames.length-1){
		this.singleRoundScore.push(Number(playerScore));
	  }else{
		  console.log("inside else");
		  this.singleRoundScore.push(Number(playerScore));
		  this.playerScores.push(this.singleRoundScore);
		  this.singleRoundScore = [];
		  this.dummyarray=[];
		  this.addPlayerScores();
	  }
	  
  }
}