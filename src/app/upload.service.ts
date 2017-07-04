import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {
	
	uploadUrl = "http://localhost:5000/api/v1.0/upload"

 constructor(private http: Http) { }
 
  uploadFile (formData: FormData): Observable<any> {
	  console.log(formData);
	const headers = new Headers({});
    let options = new RequestOptions({ headers });
    let uploadUrl = "http://localhost:5000/api/v1.0/upload"

   return this.http.post(uploadUrl, formData, options)
			.map(this.extractData)
            .catch(this.handleError);

	/* let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
	return this.http.post(this.uploadUrl, { formData }, options)
             .map(this.extractData)
             .catch(this.handleError); */

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
