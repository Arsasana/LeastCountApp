import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { User } from './user';

@Injectable()
export class AutoCompleteService {
	
	

	playerDetails= [];
	private notify = new Subject<any>();
	notifyObservable$ = this.notify.asObservable(); 
	
  constructor(private http: Http) { }
  
   public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  } 
  
  search(term: string): Observable<any> {
	  if(term.length === 0){
		  term = "nill";
	  }
	let searchUserUrl = 'http://localhost:'+port+'/api/v1.0/user/search/';
	searchUserUrl = searchUserUrl + term; 
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.get(searchUserUrl,options)
             .map(this.extractData)
             .catch(this.handleError);

}

	setPlayerDetails(playerDetails){
		this.playerDetails = playerDetails;
	}
	
	getPlayerDetails(){
		return this.playerDetails;
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
