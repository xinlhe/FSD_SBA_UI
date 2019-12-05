import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { fsdconfig } from '../../config';
import { priceData } from '../model/stocksectorprice';

@Component({
	selector: 'app-stocksectorchart',
	templateUrl: './stocksectorchart.component.html',
	styleUrls: ['./stocksectorchart.component.css']
})
export class StocksectorchartComponent implements OnInit {
	echartsIntance;
	stockData;
	lineOption;
	searchForm;
	compNameList;
	downloadURL = fsdconfig.fsdfile;
	constructor(private http: HttpClient, private router: Router,
		private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
		this.searchForm = this.formBuilder.group({
			stockCd: 'SZ000321',
			fromDate: '2019-01-01',
			toDate: '2019-12-31'

		});
	}

	ngOnInit() {

		this.findCompanyNames()
	}
	onChartInit(ec) {

		this.echartsIntance = ec;
	}

	findStockPrice(data) {

		var stockCd = data.stockCd;
		var params;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			params: new HttpParams().append('stockCd', stockCd)
				.append('from', data.fromDate)
				.append('to', data.toDate)

		};
		var url = fsdconfig.chart + "/stocksectorprice";
		this.http.post < any > (url, params, httpOptions).subscribe(
			
			(val) => {
				
					console.log(val);
					
					this.stockData = val;
					
					// this.priceList=this.stockData.weekList;
					
					this.initLineOption();
					
					//alert("return data: "+  this.stockData.weekList);				     
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
		this.setPriceData(this.stockData.weekList);
	}

	setWeek() {
		this.setPriceData(this.stockData.weekList);
		this.echartsIntance.setOption(this.lineOption);
	};

	setMonth() {
		this.setPriceData(this.stockData.monthList);
		this.echartsIntance.setOption(this.lineOption);
	}

	setQuarter() {
		this.setPriceData(this.stockData.quarterList);
		this.echartsIntance.setOption(this.lineOption);
	}

	setYear() {
		this.setPriceData(this.stockData.yearList);
		this.echartsIntance.setOption(this.lineOption);
	}

	setPriceData(priceData) {
		
		var legData = new Array();
		
		var series = new Array();
		for(var i = 0; i < priceData.length; i++) {
			
			if(priceData[i].hasOwnProperty("stockCd")) {
				
				console.log(priceData[i].values);
				
				legData[i] = priceData[i].stockCd;
				
				series[i] = {
					
					name: priceData[i].stockCd,
					type: 'line',
					data: priceData[i].values
				};

			} else {
				
				console.log(priceData[i].values);
				
				legData[i] = priceData[i].sectorCd;
				
				series[i] = {
					
					name: priceData[i].sectorCd,
					type: 'line',
					data: priceData[i].values
				};
			}

		}

		this.lineOption.xAxis.data = priceData[0].dates;
		this.lineOption.yAxis.min = 0;
		this.lineOption.yAxis.max = 2000;
		this.lineOption.legend = {
			data: legData
		};
		this.lineOption.series = series;
	}
}