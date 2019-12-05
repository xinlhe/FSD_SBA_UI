import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { fsdconfig } from '../config';
import { company } from '../model/company';

@Component({
	selector: 'app-companyupdate',
	templateUrl: './companyupdate.component.html',
	styleUrls: ['./companyupdate.component.css']
})
export class CompanyupdateComponent implements OnInit {
	
	company = company;
	companyForm: FormGroup;
	
	constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
		
		this.buildForm();
	}

	ngOnInit() {
		
		var pCompanyCd = 'undefined';
		var pOp = 'undefined';
		var pCompanyName = 'undefined';

		this.activatedRoute.queryParams.subscribe((param: any) => {
			//alert(JSON.stringify(param));
			pCompanyCd = param.companyCd;
			pOp = param.op;
			pCompanyName = param.companyName;

		});

		if(pOp == 'add') {
			
			this.buildForm();
		}
		if(pOp == 'update') {
			
			this.findCompanyByCd(pCompanyCd);
		}

		var role = window.localStorage.getItem('role');
		
		if(role == 'undefined') {
			
			role = 'user';
		}
		if(role == 'user') {
			
			//this.setReadOnly();	 		  
		}

		//this.getOptions();
	}

	setReadOnly() {
		
		document.getElementById("companyName").setAttribute("readonly", "true");
		document.getElementById("ceoName").setAttribute("readonly", "true");
		document.getElementById("director").setAttribute("readonly", "true");
		document.getElementById("brief").setAttribute("readonly", "true");
		document.getElementById("exchCd").setAttribute("disabled", "true");
		document.getElementById("sectorCd").setAttribute("disabled", "true");

	}
	buildForm() {
		
		this.companyForm = this.formBuilder.group({
			companyCd: '',
			companyName: '',
			ceoName: '',
			director: '',
			brief: '',
			exchCd: '',
			exchName: '',
			stockCd: '',
			sectorCd: '',
			sectorName: ''
		});
	}

	findCompanyByCd(data) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			params: new HttpParams().append('companyCd', data)
		};
		var url = fsdconfig.fsdcompany + "/companybycd";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {
					alert(val.retMsg);
				} else {
					// alert(val.dataList);
					this.company = val.data;
					this.initForm();
				}
			}
		);

	}

	initForm() {
		
		this.companyForm = this.formBuilder.group({
		companyCd: this.company.companyCd,
		companyName: this.company.companyName,
		ceoName: this.company.ceoName,
		director: this.company.director,
		brief: this.company.brief,
		exchCd: this.company.exchCd,
		exchName: this.company.exchName,
		stockCd: this.company.stockCd,
		sectorCd: this.company.sectorCd,
		sectorName: this.company.sectorName
		});
	}

	getOptions() {
		var x = document.getElementById("sectorCd") as HTMLSelectElement;
		var y = "";
		for(var i = 0; i < x.length; i++) {
			var opt = x.options[i];
			if(opt.value == '0340') {
				// x.selectedIndex=i;
				//alert(x.value+":"+i);
			}
			y += x.options[i].text;
			y += "<br />";
		}
		document.write(y);
	}

	onSubmit(data) {
		
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			// params: new HttpParams().append('companyCd', $("#companyCd").val()).append('exchangeCd', $("#exchangeCd").val());
			//params: new HttpParams().append('companyCd', companyCd)
		};
		var url = fsdconfig.fsdcompany + "/update";
		this.http.post < any > (url, data, httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {

					alert(val.retMsg);
				} else {

					var ipoPlan = val.data;
					alert("Added Company Successful!!!");
				}
			}
		);

	}
	/*onSubmit(customerData) {

		// Process checkout data here
		console.warn('Your order has been submitted', customerData);

		//this.items = this.cartService.clearCart();
		//this.checkoutForm.reset();
	}*/
}