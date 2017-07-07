import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GameService {

	
	
	game: any = {};
	gameStats: any = {};
	gameHistory = [];
	

  constructor(private http: Http) { }
  
  createGame (game: any,port: Number): Observable<any> {
	let createGameUrl = 'http://localhost:'+port+'/api/v1.0/game/createGame';
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(createGameUrl, { game }, options)
             .map(this.extractData)
             .catch(this.handleError);

}

  saveGame (game: any,saveGameUrl: string): Observable<any> {
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(saveGameUrl, { game }, options)
             .map(this.extractData)
             .catch(this.handleError);

}


	public setGame(game){
		this.game = game;
	}
  
	public getGame(){
		return this.game;
	}
	
	public setGameStats(gameStats){
		this.gameStats = gameStats;
	}
  
	public getGameStats(){
		return this.gameStats;
	}
	
	public setGameHistory(gameHistory){
		this.gameHistory = gameHistory;
	}
  
	public getGameHistory(){
		return this.gameHistory;
	}
  
   private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
