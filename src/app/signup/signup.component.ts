import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router} from '@angular/router'; 
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";

import { fsdconfig } from '../config';
import * as $ from "jquery";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	
	public usernamesearch : string;
	public uid : string;
	public vcode: string;
	userForm: FormGroup;
	fsdconfig=fsdconfig;

  constructor(private http: HttpClient, private router: Router, private formBuilder:FormBuilder, private activatedRoute: ActivatedRoute) {
  	
  	this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {
      	
      	this.usernamesearch = queryParams.username;
      	this.uid = queryParams.uid;
      	
      	this.userForm = this.formBuilder.group({
      		id : this.uid,
				  userName: this.usernamesearch,
				  password: '111111',
				  role:'user',
				  email:'280968704@qq.com',
				  mobileNumber:'13356786800'
		    });
      	
      	if(queryParams.username != "" || queryParams.username != null) {
      		
      		this.findUserInfoByName(queryParams.username);
      	}
      }
    )
  	
  }

 	ngOnInit() {
 		
  }

	findUserInfoByName(data) {
		
			var httpOptions = {
			
			headers: new HttpHeaders({
					'Content-Type':  'application/json;charset=UTF-8',
					// "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					'Authorization': 'my-auth-token',
					'responseType': 'application/json;charset=UTF-8'
				  })
			};	  
		  var url=fsdconfig.serverurl+fsdconfig.fsduser+"/finduser";
		  this.http.post<any>(url, this.userForm.value, httpOptions).subscribe(
	         (val) => {
	         	
	         	$("#id").val(val.user.id);
	         	$("#userName").val(val.user.userName);
	         	$("#password").val(val.user.password);
	         	$("#role").val(val.user.role);
	         	$("#email").val(val.user.email);
	         	$("#mobileNumber").val(val.user.mobileNumber);
	         	console.log(val.user.userName);
			});
	
	}
	
  save() {
		
		if(null == $("#vcode").val() || "" == $("#vcode").val()) {

	  	alert("Varify Code is not empty !!!");

	  	return;
	  }

		if(this.vcode != $("#vcode").val()) {

	  		alert("Varify Code is not correct !!!");

	  		return;
	  }
		
	  var httpOptions = {
		  
		  headers: new HttpHeaders({
			'Content-Type':  'application/json;charset=UTF-8',
			// "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			'Authorization': 'my-auth-token',
			'responseType': 'application/json;charset=UTF-8'
		  })
		};	  
	  
	  var url=fsdconfig.serverurl+fsdconfig.fsduser+"/adduser";
	  
	  this.http.post<any>(url, this.userForm.value, httpOptions).subscribe(
         (val) => {
         
			 alert(val.retMsg);
		}
		);
  }
  
  sendMail(){
  	
  	  
	  var httpOptions = {
			
			headers: new HttpHeaders({
					'Content-Type':  'application/json;charset=UTF-8',
					// "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					'Authorization': 'my-auth-token',
					'responseType': 'application/json;charset=UTF-8'
				  })
			};	  
		  var url=fsdconfig.serverurl+fsdconfig.fsduser+"/mail";
		  this.http.post<any>(url, this.userForm.value, httpOptions).subscribe(
	         (val) => {
	         	
				 this.vcode = val.vcode;
			}
		);
  

  }
}
