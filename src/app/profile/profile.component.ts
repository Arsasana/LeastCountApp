import { Component, OnInit } from '@angular/core';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { UploadService } from '../upload.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  errorMessage: string;
  mode = 'Observable';
  user: any = {};
  gameHistory = [];
  sessionStorage: CoolSessionStorage;
  hasCircles = false;
  private subscription: Subscription;
  profilePic: string;

  constructor(sessionStorage: CoolSessionStorage, private router: Router,private uploadService: UploadService, private userService: UserService, private gameService: GameService) {
    this.sessionStorage = sessionStorage;
  }

  ngOnInit() {
    let loggedUser = this.sessionStorage.getItem('user');
    if (loggedUser) {
      this.user = JSON.parse(loggedUser);
    } else {
      this.user = null;
    }

    if ( this.user.circles.length > 0 ) {
      this.hasCircles = true;
    }else {
      this.hasCircles = false;
    }

    this.userService.getGamesHistory(this.user.email)
      .subscribe(
        gameHistory => {
          console.log(gameHistory.resultObj);
		  if(gameHistory.resultObj){
			  if (gameHistory.resultObj.length < 5) {
				for (let i = 0; i < gameHistory.resultObj.length ; i++) {
				  this.gameHistory[i] = gameHistory.resultObj[i];
				}
			  } else {
				for (let i = 0; i < 5 ; i++) {
				  this.gameHistory[i] = gameHistory.resultObj[i];
				}
			  }
			}  

        },
        error =>  this.errorMessage = <any>error);
		
		this.subscription = this.uploadService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'uploadImage') {
        console.log(res.value);
        // perform your other action from here
		this.profilePic = res.value;
			console.log(this.profilePic);
			this.user.profilePic = this.profilePic;
			this.userService.updateUser(this.user)
			.subscribe(
        user => {
          this.user = user.obj;
		    this.sessionStorage.setItem("user",JSON.stringify(this.user));
			this.ngOnInit();
        },
        error =>  this.errorMessage = <any>error);
			//update user and save in sessionStorage
      }
    });
  

    /* this.gameHistory=[{
     "_id": "5946bb1683474248249c520d",
     "gameScore": 40,
     "gameName":"awesome",
     "gameOwner": "nishant@leastcount.com",
     "circle": "NA",
     "__v": 0,
     "createdTime": "2017-06-18T17:40:38.540Z",
     "players": [
     {
     "name": "sita1",
     "fullCount": 4,
     "showCount": 1,
     "score":[12,0,2,32,40,0,12,23,34,40,0,0,3,33,22,32,1,0]
     },
     {
     "name": "sita2",
     "fullCount": 3,
     "showCount": 2,
     "score":[12,0,2,32,40,0,12,23,34,40,0,0,3,33,22,32,1,0]
     }
     ],
     "winner": "sita2",

     "isActive": true
     },
     {
     "_id": "59469abe5a30b17833981655",
     "gameScore": 40,
     "gameName":"Special",
     "gameOwner": "nishant@leastcount.com",
     "circle": "NA",
     "__v": 0,
     "createdTime": "2017-06-18T15:22:38.229Z",
     "players": [
     {
     "name": "ram1",
     "fullCount": 4,
     "showCount": 1,
     "score":[12,0,2,32,40,0,12,23,34,40,0,0,3,33,22,32,1,0]
     },
     {
     "name": "ram2",
     "fullCount": 3,
     "showCount": 2,
     "score":[12,0,2,32,40,0,12,23,34,40,0,0,3,33,22,32,1,0]
     }
     ],
     "winner": "ram2",
     "isActive": true
     },
     {
     "_id": "59468ffd5a30b17833981654",
     "gameScore": 50,
     "gameName":"Something",
     "gameOwner": "nishant@leastcount.com",
     "circle": "NA",
     "__v": 0,
     "createdTime": "2017-06-18T14:36:45.609Z",
     "players": [
     {
     "name": "shiva1",
     "fullCount": 4,
     "showCount": 3,
     "score":[12,0,2,32,40,0,12,23,34,40,0,0,3,33,22,32,1,0]
     },
     {
     "name": "shiva2",
     "fullCount": 5,
     "showCount": 3,
     "score":[12,0,2,32,40,0,12,23,34,40,0,0,3,33,22,32,1,0]
     }
     ],
     "winner": "shiva1",
     "isActive": true
     }]*/

  }

  createCircle() {
    console.log("inside createCircle")
    this.router.navigateByUrl("/create-circle");
  }

  viewGameStats(index) {
    console.log("inside view game stats");
    console.log(this.gameHistory[index]);
    this.gameService.setGameStats(this.gameHistory[index]);
    this.router.navigateByUrl("/game-stats");
  }

  logout() {
    if ( this.user ) {
      this.sessionStorage.removeItem('user');
      this.router.navigate(['login']);
    }
  }

}
