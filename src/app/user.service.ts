import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	
	createCircleUrl = "http://localhost:5000/api/v1.0/user/create/circle";
	getHistoryUrl = "http://localhost:5000/api/v1.0/user/getHistory/";
	updateUserStatsUrl = "http://localhost:5000/api/v1.0/user/updateUserStats";
	

  constructor(private http: Http) { }

  updateGameMsgOption (value: any, apiUrl : string): Observable<any> {
	  console.log(apiUrl);
	  console.log(value);
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(apiUrl, { value }, options)
             .map(this.extractData)
             .catch(this.handleError);

}

	updateUserStats(playersStats: any){
		console.log(playersStats);
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(this.updateUserStatsUrl, { playersStats }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}
	
	updateUser(user: any){
	console.log(user);
	let updateUserUrl = "http://localhost:5000/api/v1.0/user/updateUser/" + user._id;
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(updateUserUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}

	getGamesHistory(email: string){
	console.log(email);
	let historyUrl = "http://localhost:5000/api/v1.0/user/getHistory/";
	this.getHistoryUrl = historyUrl + email;
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.get(this.getHistoryUrl,options)
             .map(this.extractData)
             .catch(this.handleError);
	}
	
	createCircle(user: any){
		console.log(user);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.createCircleUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}
	
	saveCircle(user: any,email){
		console.log(user);
		let saveCircleUrl = "http://localhost:5000/api/v1.0/user/edit/circle/" + email;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(saveCircleUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);
	}	
	
	deleteCircle(user: any,email){
		console.log(user);
		let deleteCircleUrl = "http://localhost:5000/api/v1.0/user/delete/circle/" + email;
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
