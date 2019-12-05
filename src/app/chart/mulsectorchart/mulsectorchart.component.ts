import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router'; 
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

import { fsdconfig } from '../../config';
import {priceData } from '../model/sectorpriceList';

@Component({
  selector: 'app-mulsectorchart',
  templateUrl: './mulsectorchart.component.html',
  styleUrls: ['./mulsectorchart.component.css']
})
export class MulsectorchartComponent implements OnInit {
	echartsIntance;
	lineOption;
	stockData;
	searchForm;
	sectorNameList;
	downloadURL=fsdconfig.fsdfile;
  constructor(private http: HttpClient, private router: Router,   
			private activatedRoute: ActivatedRoute, private formBuilder:FormBuilder) {
		this.searchForm= this.formBuilder.group({
			sectorCd1: '0340',
			sectorCd2: '0619',
			fromDate: '2019-05-12',
			toDate: '2019-07-12'
			
		});
		
			 }
	ngOnInit() {
 		//this.initLineOption();
		this.findSectorNames();

	}

	onChartInit(ec) {     
         this.echartsIntance = ec;
	}
	
	findStockPrice(data){
		 //alert(data.stockCds);
			 	  const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type':  'application/json;charset=UTF-8',
 			'Authorization': 'my-auth-token',
			'responseType': 'application/json;charset=UTF-8'
		  }),
			params: new HttpParams().append('sectorCds', data.sectorCd1)
			                      .append('sectorCds', data.sectorCd2)
			                      .append('fromDate', data.fromDate)
			                      .append('toDate', data.toDate)
		};	  
	   	var url=fsdconfig.chart+"/listsectorprice";
		this.http.post<any>(url, "", httpOptions).subscribe(
         (val) => {
			 if(val.status==-1){
				 alert(val.retMsg);
			 }else{				  
					this.stockData=val.data;
					 this.initLineOption();

					//alert("return data: "+  this.stockData.weekList[0].dates);				     
 			}
		}
	);
	}
	
	findSectorNames(){
	 	  const httpOptions = {
		  headers: new HttpHeaders({
			'Content-Type':  'application/json;charset=UTF-8',
 			'Authorization': 'my-auth-token',
			'responseType': 'application/json;charset=UTF-8'
		  }),
			//params: new HttpParams().append('searchStr', data)
		};	  
	   	var url=fsdconfig.fsdsector+"/listSectorNames";
		this.http.post<any>(url, "", httpOptions).subscribe(
         (val) => {
			 if(val.status==-1){
				 alert(val.retMsg);
			 }else{
				
				 if(val.dataList.length>0){
					 this.sectorNameList=val.dataList;
					//alert("return dataList: "+val.dataList);					 
			    }
 			}
		}
	);
   }
	
	initLineOption(){
		this.lineOption = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			}
		},
		toolbox: {
			feature: {
				dataView: {show: true, readOnly: false},
				magicType: {show: true, type: ['line', 'bar','stack']},
				restore: {show: true},
				saveAsImage: {show: true}
			}
		},
	
		xAxis: {
			type: 'category',
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			type: 'line'
		}]
	};
		this.setstockData(this.stockData.weekList);
	}
	

	setWeek(){
		this.setstockData(this.stockData.weekList);				
		this.echartsIntance.setOption(this.lineOption);
	};
	
	setMonth(){
		this.setstockData(this.stockData.monthList);
		this.echartsIntance.setOption(this.lineOption);
	}
	
	setQuarter(){
 		this.setstockData(this.stockData.quarterList);
		this.echartsIntance.setOption(this.lineOption);
	}
	
	setYear(){
 		this.setstockData(this.stockData.yearList);
		this.echartsIntance.setOption(this.lineOption);
	}

	setstockData(stockData){
		var legData=new Array();
		var series=new Array();
		for(var i=0; i<stockData.length; i++){
			legData[i]=stockData[i].sectorCd;
			series[i]={
				name: stockData[i].sectorCd,
				type: 'line',
				data: stockData[i].values
			};
		}
		 
		this.lineOption.xAxis.dseriesata=stockData[0].dates;
		this.lineOption.yAxis.min=0;
		this.lineOption.yAxis.max=2000;
		this.lineOption.legend={data: legData};
		this.lineOption.series=series;		
	} 
}
