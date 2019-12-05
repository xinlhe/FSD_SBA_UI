import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { fsdconfig } from '../config';
@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

	uploadForm;
	uploadFiles: File[];
	constructor(private http: HttpClient, private router: Router,
		private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
			
		this.uploadForm = this.formBuilder.group({
			upload: undefined
		});
	}

	ngOnInit() {}

	onClickSubmit(value) {

		const httpOptions = {

			headers: new HttpHeaders({
				//'Content-Type':  'multipart/form-data',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			//params: new HttpParams().append('stockCd', stockCd)
		};

		let formData = new FormData();

		for(var i = 0; i < this.uploadFiles.length; i++) {

			var file = this.uploadFiles[i];

			formData.append("file", file, file.name);
		}

		var url = fsdconfig.fsdfile + "/excel";
		
		this.http.post < any > (url, formData, httpOptions).subscribe(
			(val) => {
			if(val.status == -1) {

				alert(val.retMsg);

			} else {

				alert(val.retMsg);
			}
		});

	}

	handleFile(files: File[]) {

		this.uploadFiles = files;
		//alert(files.length);
	}
}