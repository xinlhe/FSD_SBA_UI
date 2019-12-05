import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { companyList } from '../model/companyList';
import { fsdconfig } from '../config';

@Component({
	selector: 'app-companylist',
	templateUrl: './companylist.component.html',
	styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {
	
	companyList = companyList;
	searchForm;
	compNameList;
	constructor(private http: HttpClient, private router: Router,
		private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
			
		this.searchForm = this.formBuilder.group({
			companyName: ''
		});
	}
	ngOnInit() {
		
		if(location.href.indexOf("#reloaded")==-1) {
	        location.href=location.href+"#reloaded";
	        location.reload();
	    }
		
		this.findCompanyList();
		
		document.getElementById("companyName").onmouseup = function() {
			
			document.getElementById("dataList").style.display = "none";
		};
	}

	filterData() {

		var dataListDiv = document.getElementById("dataList");
		
		if(this.searchForm.value.companyName.length > 1) {

			this.findCompanyByName(this.searchForm.value);
			
			dataListDiv.style.display = "block";
		} 
		else {
			
			dataListDiv.style.display = "none";

		}
		//alert();
	}

	/*setLiToInput(eve) {

		this.searchForm.value.companyName = eve.srcElement.innerHTML;
	}*/
	
	findCompanyByName(data) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			params: new HttpParams().append('companyName', data.companyName)
		};
		var url = fsdconfig.fsdcompany + "/companybyname";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {
					
					alert(val.retMsg);
				
				} else {

					this.companyList = val.dataList;

				}
			}
		);

	}

	testUL() {
		
		alert("testUL");
	}
	
	findCompanyList(){
		
		const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type':  'application/json;charset=UTF-8',
 			'Authorization': 'my-auth-token',
			'responseType': 'application/json;charset=UTF-8'
		  }),
			//params: new HttpParams().append('searchStr', data.companyName)
		};	  
	   
	    var url=fsdconfig.fsdcompany+"/listcompany";
	  
		this.http.post<any>(url, "", httpOptions).subscribe(
			
       (val) => {
       	
			 if(val.status==-1){
			 	
				 alert(val.retMsg);
				 
			 }else{
				
				this.companyList = val.dataList;

 			}
		}
	);
	}

	findCompanyNames(data) {
		
		const httpOptions = {
			
			headers: new HttpHeaders({
				
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			params: new HttpParams().append('searchStr', data)
		};
		var url = fsdconfig.fsdcompany + "/searchcompanyname";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {
					alert(val.retMsg);
				} else {
					if(val.dataList.length > 0) {
						
						this.compNameList = val.dataList;
						this.createUL();
						document.getElementById("dataList").style.display = "block";
					}
				}
			}
		);
	}

	createUL() {
		
		var ulObj = document.getElementById('ulList');
		while(ulObj.hasChildNodes()) {
			ulObj.removeChild(ulObj.firstChild);
		}
		for(var index = 0; index < this.compNameList.length; index++) {

			var liText = this.compNameList[index];
			var li = document.createElement("li");
			li.className = "custom-option-li";
			li.style.lineHeight = "30px";
			li.style.cursor = "hand";
			li.onmouseover = function() {

				this.style.backgroundColor = "#F2C051";
				this.style.cursor = "pointer";
			};
			li.onclick = function() {
				var txtName = this.getElementsByTagName("span")[0];
				//alert(txtName.innerHTML);
			};
			li.onmouseout = function() {
				this.style.backgroundColor = "transparent";

			};
			li.innerHTML = "<span style='cursor:pointer'>" + liText + "</span>";
			ulObj.appendChild(li);
		}
	}

}