import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerNameService} from '../player-name.service';
import { GameService} from '../game.service';

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

  constructor(	private playerNameService: PlayerNameService,
				private gameService: GameService,
				private router: Router) {

  }

  ngOnInit() {
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
       console.log('tempArr length' + tempArr.length);
       for (let i = 0 ; i < tempArr.length; i++) {
      for (let j = 0; j < length; j++ ) {
           this.individualplayerScores[j].push(tempArr[i][j]);
        }
      }
       console.log(this.individualplayerScores);
       this.calculateTotalScore();
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
        console.log(this.playerTotalScore);
      }

    }

    onBlurMethod(event: any, scoreForm: any) {
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
        }
    }else {
        console.log('invalid entry');
      }
    }
  }
