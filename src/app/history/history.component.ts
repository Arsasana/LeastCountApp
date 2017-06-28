import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService} from '../game.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  gameHistory = [{
    "name":"Awesome",
    "players":['Karan','Vinod','Sumanth'],
    "winner":"Karan"
  },{
    "name":"Sunday Match",
    "players":['Gautham','Raj','Balu','pawan','Kalyan'],
    "winner":"pawan"
  },{
    "name":"Three showdown",
    "players":['Mahesh','Brahmi','30 years Industry'],
    "winner":"30 years Industry"
  },{
    "name":"Friendly Match",
    "players":['Bablu','Arjun','Karan','sam','Kajal'],
    "winner":"Kajal"
  },{
    "name":"WorldCup",
    "players":['pawan','Gautham','Kajal'],
    "winner":"Gautham"
  }];

  errorMessage: string;
  mode = 'Observable';

  constructor(private router: Router,
              private gameService: GameService) { }

  ngOnInit() {

  }

  viewStats(index) {
    console.log(index);
    console.log(this.gameHistory[index]);
  }
}
