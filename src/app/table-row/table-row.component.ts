import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {
	
	playerNames = ['a','b','c'];
	private model:any = {};
	private scoreArr = [[1,2,3]];
	
	

  constructor() { }

  ngOnInit() {
  }

}
