import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { fsdconfig } from '../../config';
import { priceData } from '../model/sectorprice';

@Component({
	selector: 'app-singlesectorchart',
	templateUrl: './singlesectorchart.component.html',
	styleUrls: ['./singlesectorchart.component.css']
})
export class SinglesectorchartComponent implements OnInit {
	echartsIntance;
	priceList;
	stockData;
	lineOption;
	searchForm;
	sectorNameList;
	downloadURL = fsdconfig.fsdfile;
	constructor(private http: HttpClient, private router: Router,
		private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
		this.searchForm = this.formBuilder.group({
			sectorCd: '0340'
		});
	}

	ngOnInit() {
		this.findSectorNames()
	}
	onChartInit(ec) {
		this.echartsIntance = ec;
	}

	findStockPrice(data) {
		
		var sectorCd = data.sectorCd;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			params: new HttpParams().append('sectorCd', sectorCd)
		};
		var url = fsdconfig.chart + "/sectorprice";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {
					alert(val.retMsg);
				} else {
					this.stockData = val;
					this.priceList = this.stockData.weekList;
					this.initLineOption();
					//alert("return data: "+  this.stockData.weekList);				     
				}
			}
		);
	}

	findSectorNames() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			//params: new HttpParams().append('searchStr', data)
		};
		var url = fsdconfig.fsdsector + "/listSectorNames";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {
					alert(val.retMsg);
				} else {

					if(val.dataList.length > 0) {
						
						this.sectorNameList = val.dataList;
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
				data: this.priceList.dates
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: this.priceList.values,
				type: 'line'
			}]
		};

	}

	setWeek() {
		this.priceList = this.stockData.weekList;
		this.lineOption.xAxis.data = this.priceList.dates;
		this.lineOption.series[0].data = this.priceList.values;
		this.echartsIntance.setOption(this.lineOption);

	}
	setMonth() {
		this.priceList = this.stockData.monthList;
		this.lineOption.xAxis.data = this.priceList.dates;
		this.lineOption.series[0].data = this.priceList.values;
		this.echartsIntance.setOption(this.lineOption);

	}

	setQuarter() {

		this.priceList = this.stockData.quarterList;
		this.lineOption.xAxis.data = this.priceList.dates;
		this.lineOption.series[0].data = this.priceList.values;
		this.echartsIntance.setOption(this.lineOption);

	}

	setYear() {
		this.priceList = this.stockData.yearList;
		this.lineOption.xAxis.data = this.priceList.dates;
		this.lineOption.series[0].data = this.priceList.values;
		this.echartsIntance.setOption(this.lineOption);
	}
}