import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router ,NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public userName: string;
	public uid : string;
	public isLogin: Boolean;
	public isAdmin: Boolean;
	
  constructor(public router:Router) { 
  	
  }

  ngOnInit() {
  	
  	var role = window.localStorage.getItem('role');
		 var token = window.localStorage.getItem('token');
		 this.userName = window.localStorage.getItem('userName');
		 this.uid = window.localStorage.getItem("uid");
		
		 if(this.userName != null) {
		 	
		 	 this.isLogin = false;
		 	 
		 	 if(this.userName == "admin") {
		 	 	
		 	 		this.isAdmin = true;
		 	 }
		 	 else {

					this.isAdmin = false;
		 	 }
		 }
		 else {
		 	
		 	 this.isAdmin = false;
		 	 this.isLogin = true;
		 }
  }
  
  userLogout() {
  	
		 window.localStorage.clear();
		 location.reload();
	}

	updateUserInfo(username) {
		
		let navigationExtras: NavigationExtras = {
	    queryParams: { 'username': username, 'uid' : this.uid }
    };
    this.router.navigate(['/signup'],navigationExtras);
	}
}
