import { Component, OnInit } from '@angular/core';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { UserService} from '../user.service';

@Component({
  selector: 'app-gamerules',
  templateUrl: './gamerules.component.html',
  styleUrls: ['./gamerules.component.css']
})
export class GamerulesComponent implements OnInit {

	read = false;
	showAgain = false;
	updateGameMsgUrl = 'http://localhost:5000/api/v1.0/user/updateGameMsgOption/';
	user: any = {};
	sessionStorage: CoolSessionStorage;

   constructor(sessionStorage: CoolSessionStorage,  private userService: UserService,) {
        this.sessionStorage = sessionStorage;   
    }
 
  ngOnInit() {
	  let loggedUser = this.sessionStorage.getItem('user');
	  if (loggedUser) {
		this.user = JSON.parse(loggedUser);
			if(this.user.showGameRulesMsg){
				this.read = false;
			}else{
				this.read = true;
			}
	  } else {
		  this.user = null;
	  }
	  
	 
  }
  
  close(){
		this.read = true;
		console.log(this.showAgain);
		if(this.user){
			this.updateGameMsgUrl = this.updateGameMsgUrl + this.user._id;
			this.userService.updateGameMsgOption(!this.showAgain,this.updateGameMsgUrl);
		}
  }

}
