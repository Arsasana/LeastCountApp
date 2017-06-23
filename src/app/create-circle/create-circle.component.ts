import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AutoCompleteService} from '../auto-complete.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-create-circle',
  templateUrl: './create-circle.component.html',
  styleUrls: ['./create-circle.component.css']
})
export class CreateCircleComponent implements OnInit {
	
	circle: any = {};
	errorMessage: string;
	mode = 'Observable';
	disablePlayerNameField = false;
	playerDetails = [];
	playerNames = [];
	private subscription: Subscription;

  constructor(private autoCompleteService: AutoCompleteService) { }

  ngOnInit() {
	  
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
  
  removeMember(index){
	  console.log(index);
	  this.playerNames.splice(index,1);
	  this.playerDetails.splice(index,1);
	  this.autoCompleteService.setPlayerDetails(this.playerDetails);
  }
  
  onSubmit(createCircleForm : NgForm){
	  this.circle.players = this.playerDetails;
	  this.circle.playersCount = this.playerNames.length;
	  console.log(this.circle);
	  /*this.gameService.createGame(this.game)
                     .subscribe(
                      game => {

                         this.game = game;
						 console.log(this.game);
						 this.gameService.setGame(this.game.obj);
                          if ( this.game.success ) {
                            this.router.navigate(['game']);
                          }
                       },
                       error =>  this.errorMessage = <any>error);*/
  }

}
