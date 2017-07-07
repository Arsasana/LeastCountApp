import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	
  constructor(private http: Http) { }

  updateGameMsgOption (value: any, apiUrl : string, port: Number): Observable<any> {
	  console.log(apiUrl);
	  console.log(value);
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(apiUrl, { value }, options)
             .map(this.extractData)
             .catch(this.handleError);

}

	updateUserStats(playersStats: any, port: Number){
		console.log(playersStats);
		let updateUserStatsUrl = "http://localhost:"+port+"/api/v1.0/user/updateUserStats";
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(updateUserStatsUrl, { playersStats }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}
	
	updateUser(user: any, port: Number){
	console.log(user);
	let updateUserUrl = "http://localhost:"+port+"/api/v1.0/user/updateUser/" + user._id;
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(updateUserUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}

	getGamesHistory(email: string, port: Number){
	console.log(email);
	let historyUrl = "http://localhost:"+port+"/api/v1.0/user/getHistory/" + email;
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.get(getHistoryUrl,options)
             .map(this.extractData)
             .catch(this.handleError);
	}
	
	createCircle(user: any, port: Number){
		console.log(user);
		let createCircleUrl = "http://localhost:"+port+"/api/v1.0/user/create/circle";
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(createCircleUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}
	
	saveCircle(user: any,email, port: Number){
		console.log(user);
		let saveCircleUrl = "http://localhost:"+port+"/api/v1.0/user/edit/circle/" + email;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(saveCircleUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}	
	
	deleteCircle(user: any,email, port: Number){
		console.log(user);
		let deleteCircleUrl = "http://localhost:"+port+"/api/v1.0/user/delete/circle/" + email;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(deleteCircleUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}	

 private extractData(res: Response) {
    let body = res.json();
	console.log(body);
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
