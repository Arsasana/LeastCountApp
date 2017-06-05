import { Component,  AfterViewInit  } from '@angular/core';
import { PlayerNameService} from '../player-name.service';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.css']
})
export class PlayerNameComponent implements  AfterViewInit  {
	
	private model:any = {};

  constructor(private playerNameService : PlayerNameService) { }
  
  
  
  ngAfterViewInit(): void {
     
    }

  addPlayer(playerName){
	 
	  this.playerNameService.addPlayer(playerName);
	  
  }
  
  onBlurMethod(playername:any){
	  console.log(playername.value);
	  if(playername.value !== undefined){
	  this.playerNameService.addPlayer(playername.value);
	  }
	  console.log(this.playerNameService.getPlayer());
  }


}
