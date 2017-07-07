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
  port: Number;

  constructor(sessionStorage: CoolSessionStorage, private router: Router,private uploadService: UploadService, private userService: UserService, private gameService: GameService) {
    this.sessionStorage = sessionStorage;
  }

  ngOnInit() {
	  this.port = window.location.port;
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

    this.userService.getGamesHistory(this.user.email,this.port)
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
			this.userService.updateUser(this.user,this.port)
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
