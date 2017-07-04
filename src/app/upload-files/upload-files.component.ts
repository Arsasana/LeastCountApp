import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { CoolSessionStorage } from 'angular2-cool-storage';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
	
	errorMessage: string;
  successMessage: string;
  mode = 'Observable';
  user: any = {};
  value: string;
  submitted = false;
  sessionStorage: CoolSessionStorage;
  formData: FormData;
  url: string;

 constructor( private http: Http,
				private uploadService: UploadService,
			  public router: Router,
			  sessionStorage: CoolSessionStorage  ) { 
			  this.sessionStorage = sessionStorage;}

  ngOnInit() {
  }

    
  readUrl(event) {
  if (event.target.files && event.target.files[0]) {
	  
	const files = event.target.files || event.srcElement.files;
	const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
	this.formData = formData;
	
    var reader = new FileReader();

    reader.onload = (event: any) => {
		console.log(event.target);
      this.url = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }
}
  
  onSubmit(){
	  
	  const headers = new Headers({});
		let options = new RequestOptions({ headers });
		let uploadUrl = "http://localhost:5000/api/v1.0/upload"

	this.http.post(uploadUrl, this.formData, options).subscribe(res => {
      let body = res.json();
      this.value = body.file.destination + body.file.filename;
	  console.log(this.value);
    });
	  
  }
}
