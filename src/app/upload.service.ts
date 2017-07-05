import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class UploadService {
	
	imgPath: string;
	private notify = new Subject<any>();
	notifyObservable$ = this.notify.asObservable(); 
	
	 public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  } 

 constructor() { }
 
  getImgPath(){
	  return this.imgPath;
  }
  
  setImgPath(imgPath){
	  this.imgPath = imgPath;
  }

}
