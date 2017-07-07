import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AutoCompleteService} from '../auto-complete.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  items: Observable<any>;
  term = new FormControl();
  playerDetails = [];
  playerNames = [];
  searchTerm: String = "";
  selectedPlayerName: string = null;
  port: string
  
  constructor(public autoCompleteService: AutoCompleteService) {
    
  }

  ngOnInit() {
	  console.log(this.items);
	  this.port = window.location.port;
	 this.items = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 .switchMap(term => this.autoCompleteService.search(term.toLowerCase(),this.port))
				 
  }
  
  
  selectItem(item: any){
	  let playerDetails: any ={};
		
		playerDetails.name = item.name;
		playerDetails.playerId = item.playerId;
		playerDetails.profilePic = item.profilePic;
		 if(this.containsObject(playerDetails,this.playerDetails)){
			 this.selectedPlayerName = item.name;
		 console.log("player already exists"); 
		}else{
			this.selectedPlayerName = null;
		this.playerNames.push(item.name);
		this.playerDetails.push(playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.autoCompleteService.notifyOther({option: 'updatePlayerDetails', value: this.playerDetails});
		}
		this.term = new FormControl();
		this.ngOnInit();
	  
  }
  
  addPlayer(user: any) {

	   let playerDetails: any ={};
		
		playerDetails.name = user.value;
		playerDetails.playerId = 0;
		playerDetails.profilePic = "http://placehold.it/150x150";
		if(this.containsObject(playerDetails,this.playerDetails)){
		 console.log("player already exists"); 
		 this.selectedPlayerName = user.value;
		}else{
			this.selectedPlayerName = null;
		this.playerNames.push(user.value);
		this.playerDetails.push(playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.autoCompleteService.notifyOther({option: 'updatePlayerDetails', value: this.playerDetails});
		}
		this.term = new FormControl();
		this.ngOnInit();
	  
    }
	
	public filter(){
		this.searchTerm = this.term.value;
		console.log(this.searchTerm);
	}
	
	 containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].name === obj.name && list[i].playerId === obj.playerId) {
            return true;
        }
    }

    return false;
}

}

//This inherits from our base component and uses a different style sheet.
@Component({
  selector: 'app-autocomplete-2',
  //This is sharing the template with the parent class.  Note
  //this needs to be included since templateUrl doesn't automatically
  //inherit.
  templateUrl: './autocomplete.component.html',
  //This is using a unique css file 
  styleUrls: ['./autocomplete2.component.css']
})
export class Autocomplete2Component extends AutocompleteComponent {
	
	@Input() circleIndex: Number ;
	
	term = new FormControl();
  playerDetails = [];
  playerNames = [];
  searchTerm: String = "";
	
	selectItem(item: any){
	  let playerDetails: any ={};
	  this.playerNames.push(item.name);
		playerDetails.name = item.name;
		playerDetails.playerId = item.playerId;
		playerDetails.profilePic = item.profilePic;
		playerDetails.circleIndex = this.circleIndex;
		this.playerDetails.push(playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.autoCompleteService.notifyOther({option: 'updatePlayerDetailsInViewCircle', value: this.playerDetails});
		this.term = new FormControl();
		this.playerDetails = [];
		super.ngOnInit();
  }
  
  addPlayer(user: any) {

	   let playerDetails: any ={};
		this.playerNames.push(user.value);
		playerDetails.name = user.value;
		playerDetails.playerId = 0;
		playerDetails.circleIndex = this.circleIndex;
		playerDetails.profilePic = "http://placehold.it/150x150";
		this.playerDetails.push(playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.autoCompleteService.notifyOther({option: 'updatePlayerDetailsInViewCircle', value: this.playerDetails});
		this.term = new FormControl();
		this.playerDetails = [];
		super.ngOnInit();
    }
}
