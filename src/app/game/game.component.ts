import { Component, OnInit } from '@angular/core';
import { PlayerNameService} from '../player-name.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

   playerNames = [];
   playerScores = [];
   individualplayerScores = [];
   dummyarray = [];
   singleRoundScore = [];
   playerTotalScore = [];
   gameScore: number;
   gameName: string;
  model: any = {};
  pattern = '^([0-9]|0[0-9]|1[0-9]|2[0-9]|3[0-9]|40|XX|xx)$';

  constructor(	private playerNameService: PlayerNameService	) {
  this.playerNames = this.playerNameService.getPlayerNames();
  this.gameScore = this.playerNameService.getGameScore();
  this.gameName = this.playerNameService.getGameName();

  }

  ngOnInit() {
    this.createInitialArrays();
  }


    createInitialArrays() {
       const sumArr = [];

      for ( let i = 0 ; i < this.playerNames.length; i++) {
        sumArr.push([]);
      }
     this.individualplayerScores = sumArr;

    }

    addplayerScores() {
       const length = this.playerNames.length;
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
           sum += tempArr[i][j];
        }
        this.playerTotalScore[i] = sum;
        console.log(this.playerTotalScore);
      }

    }

    onBlurMethod(event: any) {
        const playerScore = event.target.value;
        const id = Number(event.target.attributes.id.value);
      this.singleRoundScore = this.singleRoundScore.filter(Boolean);
      if ( playerScore > 40  || playerScore < 0 ) {
        console.log('invalid entry');
      } else if ( playerScore || playerScore === 0 ) {
        if ( this.singleRoundScore.length < this.playerNames.length - 1) {
          this.singleRoundScore.splice(id, 0, Number(playerScore));
          console.log( 'singleRoundScore : ', this.singleRoundScore);
          console.log( 'length of singleroundarr inside if : ', this.singleRoundScore.length);
        }else {
          console.log('inside else');
          this.singleRoundScore.splice(id, 0, Number(playerScore));
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
