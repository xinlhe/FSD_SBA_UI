import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { fsdconfig } from '../config';

@Component({
	selector: 'app-exchangeadd',
	templateUrl: './exchangeadd.component.html',
	styleUrls: ['./exchangeadd.component.css']
})
export class ExchangeaddComponent implements OnInit {
	exchForm;
	constructor(private http: HttpClient, private router: Router,
		private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
		private location: Location) {

		this.exchForm = this.formBuilder.group({
			exchCd: '',
			exchName: '',
			contactAddr: '',
			brief: '',
			remarks: '0',
		});
	}
	ngOnInit() {
		var exchCd = "undefined";
		var op = 'undefined';
		this.activatedRoute.queryParams.subscribe((param: any) => {
			console.log(param.exchCd, 'second');
			exchCd = param.exchCd;
			op = param.op;
			if(op == 'update') {
				
				this.findExchByCd(exchCd);
			}
		});
	}
	findExchByCd(exchCd) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			params: new HttpParams().append('exchCd', exchCd)
		};
		var url = fsdconfig.fsdexch + "/findexc";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {
					
					alert(val.retMsg);
					
				} else {
					
					console.log(val);
					
					var exchange = val;
					
					if(exchange != null) {
						
						this.setExchForm(exchange);
					}

				}
			}
		);
	}

	setExchForm(exchange) {
		this.exchForm = this.formBuilder.group({
			exchCd: exchange.exchCd,
			exchName: exchange.exchName,
			contactAddr: exchange.contactAddr,
			brief: exchange.brief,
			remarks: exchange.remarks
		});
	}

	onSubmit(data) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			//params: new HttpParams().append('companyCd', companyCd)
		};
		var url = fsdconfig.fsdexch + "/add";
		this.http.post < any > (url, data, httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {
					alert(val.retMsg);
				} else {
					alert("Exchange Added Successful !!!");
					//alert(val.data);

				}
			}
		);
	}

	goBack() {
		this.location.back();
	}

}