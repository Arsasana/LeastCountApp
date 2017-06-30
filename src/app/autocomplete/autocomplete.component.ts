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
  
  constructor(public autoCompleteService: AutoCompleteService) {
    
  }

  ngOnInit() {
	  console.log(this.items);
	 this.items = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 .switchMap(term => this.autoCompleteService.search(term))
				 
  }
  
  
  selectItem(item: any){
	  let playerDetails: any ={};
	  this.playerNames.push(item.name);
		playerDetails.name = item.name;
		playerDetails.playerId = item.playerId;
		this.playerDetails.push(playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.autoCompleteService.notifyOther({option: 'updatePlayerDetails', value: this.playerDetails});
		this.term = new FormControl();
		this.ngOnInit();
  }
  
  addPlayer(user: any) {

	   let playerDetails: any ={};
		this.playerNames.push(user.value);
		playerDetails.name = user.value;
		playerDetails.playerId = 0;
		this.playerDetails.push(playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.autoCompleteService.notifyOther({option: 'updatePlayerDetails', value: this.playerDetails});
		this.term = new FormControl();
		this.ngOnInit();
    }
	
	private filter(){
		this.searchTerm = this.term.value;
		console.log(this.searchTerm);
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
		playerDetails.circleIndex = this.circleIndex;
		this.playerDetails.push(playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.autoCompleteService.notifyOther({option: 'updatePlayerDetails', value: this.playerDetails});
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
		this.playerDetails.push(playerDetails);
		this.autoCompleteService.setPlayerDetails(this.playerDetails);
		this.autoCompleteService.notifyOther({option: 'updatePlayerDetails', value: this.playerDetails});
		this.term = new FormControl();
		this.playerDetails = [];
		super.ngOnInit();
    }
}
