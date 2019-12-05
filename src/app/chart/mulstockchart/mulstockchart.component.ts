import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { fsdconfig } from '../../config';
import { priceData } from '../model/stockpriceList';

@Component({
	selector: 'app-mulstockchart',
	templateUrl: './mulstockchart.component.html',
	styleUrls: ['./mulstockchart.component.css']
})
export class MulstockchartComponent implements OnInit {
	echartsIntance;
	lineOption;
	stockData;
	searchForm;
	compNameList;
	downloadURL = fsdconfig.fsdfile;
	constructor(private http: HttpClient, private router: Router,
		private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
		this.searchForm = this.formBuilder.group({
			stockCd1: 'SZ000321',
			stockCd2: '600116',
			fromDate: '2019-01-01',
			toDate: '2019-12-31'

		});

	}
	ngOnInit() {
		//this.initLineOption();
		this.findCompanyNames();

	}
	findStockPrice(data) {
		//alert(data.stockCds);
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			params: new HttpParams().append('stockCds', data.stockCd1)
				.append('stockCds', data.stockCd2)
				.append('from', data.fromDate)
				.append('to', data.toDate)
		};
		var url = fsdconfig.chart + "/listpricedetail";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {
					
					alert(val.retMsg);
				} else {
					
					this.stockData = val;
					this.initLineOption();

				}
			}
		);
	}
	findCompanyNames() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			//params: new HttpParams().append('searchStr', data)
		};
		var url = fsdconfig.fsdcompany + "/listcompany";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {

				if(val.status == -1) {

					alert(val.retMsg);

				} else {

					if(val.dataList.length > 0) {

						this.compNameList = val.dataList;
					}
				}
			}
		);
	}

	onChartInit(ec) {
		
		this.echartsIntance = ec;
	}

	initLineOption() {
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
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['line', 'bar', 'stack']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
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

	setWeek() {
		
		this.setstockData(this.stockData.weekList);
		this.echartsIntance.setOption(this.lineOption);
	};

	setMonth() {
		
		this.setstockData(this.stockData.monthList);
		this.echartsIntance.setOption(this.lineOption);
	}

	setQuarter() {
		
		this.setstockData(this.stockData.quarterList);
		this.echartsIntance.setOption(this.lineOption);
	}

	setYear() {
		
		this.setstockData(this.stockData.yearList);
		this.echartsIntance.setOption(this.lineOption);
	}

	setstockData(priceDL) {
		
		var legData = new Array();
		var series = new Array();
		for(var i = 0; i < priceDL.length; i++) {
			legData[i] = priceDL[i].stockCd;
			series[i] = {
				name: priceDL[i].stockCd,
				type: 'line',
				data: priceDL[i].values
			};
		}

		this.lineOption.xAxis.data = priceDL[0].dates;
		this.lineOption.yAxis.min = 0;
		this.lineOption.yAxis.max = 2000;
		this.lineOption.legend = {
			data: legData
		};
		this.lineOption.series = series;
	}
	
	downloadExc() {
		
		//{{downloadURL}}/stockList?stockCd={{searchForm.value.stockCd1}}&stockCd={{searchForm.value.stockCd2}}&fromDate={{searchForm.value.fromDate}}&toDate={{searchForm.value.toDate}}
	}
	
}