import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router'; 
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

import { exchangeList } from '../model/exchangeList';
import { fsdconfig } from '../config';
exchangeList
@Component({
  selector: 'app-exchangelist',
  templateUrl: './exchangelist.component.html',
  styleUrls: ['./exchangelist.component.css']
})
export class ExchangelistComponent implements OnInit {
	exchangeList=exchangeList;
  constructor(private http: HttpClient, private router: Router,   
			private activatedRoute: ActivatedRoute, private formBuilder:FormBuilder) {
			}
  ngOnInit() {
	  this.findAllExchnage();
  }
	findAllExchnage(){
		
		const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type':  'application/json;charset=UTF-8',
 			'Authorization': 'my-auth-token',
			'responseType': 'application/json;charset=UTF-8'
		  }),
			//params: new HttpParams().append('searchStr', data.companyName)
		};	  
	  var url=fsdconfig.fsdexch+"/list";
	  
		this.http.post<any>(url, "", httpOptions).subscribe(
			
       (val) => {
       	
			 if(val.status==-1){
			 	
				 alert(val.retMsg);
				 
			 }else{
				
				 console.log(val);

				 this.exchangeList=val;

 			}
		}
	);
	}
}
