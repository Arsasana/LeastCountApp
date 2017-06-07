import { Component, ComponentFactoryResolver,AfterViewInit,ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerNameComponent } from '../player-name/player-name.component';
import { PlayerNameService} from '../player-name.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit,AfterViewInit {
	@ViewChild("liContainer", {read: ViewContainerRef}) activeComponent: ViewContainerRef;
	playerNames = [];
	
	model:any="";	

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    
  }
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef,
				private playerNameService : PlayerNameService,
				private router : Router) {
    }

    private addPlayer() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(PlayerNameComponent);
        const ref = this.activeComponent.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
  
  onSubmit(gameForm : NgForm){
	  this.playerNames = this.playerNameService.getPlayer();
	  console.log(this.playerNames);
	  this.playerNameService.setGameName(gameForm.value.gamename);
	  this.playerNameService.setGameScore(gameForm.value.gamescore);
	  console.log(this.playerNameService.getGameName());
	  console.log(this.playerNameService.getGameScore());
	  this.router.navigate(['/game']);
  }
  
}
