import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthService {

	loginUrl = 'http://localhost:5000/api/v1.0/user/login';
	

  constructor(private http: Http) { }

  registerUser (user: any,port: Number): Observable<any> {
	let registerUrl = 'http://localhost:'+port+'/api/v1.0/user/register';
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(registerUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);
}

	authenticateUser (user: any,port: Number): Observable<any> {
	let loginUrl = 'http://localhost:'+port+'/api/v1.0/user/login';
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(loginUrl, { user }, options)
             .map(this.extractData)
             .catch(this.handleError);

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
