import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { fsdconfig } from '../../config';
import { priceData } from '../model/stockprice';

@Component({
	selector: 'app-singlestockchart',
	templateUrl: './singlestockchart.component.html',
	styleUrls: ['./singlestockchart.component.css']
})
export class SinglestockchartComponent implements OnInit {

	echartsIntance;
	priceList;
	lineOption;
	public priceData = priceData;
	searchForm;
	compNameList;
	downloadURL = fsdconfig.fsdfile;
	constructor(private http: HttpClient, private router: Router,
		private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
		this.searchForm = this.formBuilder.group({

			stockCd: '500112'
		});
		
		if(location.href.indexOf("#reloaded")==-1) {
	        location.href=location.href+"#reloaded";
	        location.reload();
	    }

	}
	ngOnInit() {

		this.priceList = this.priceData.weekList;

		this.initLineOption();
		this.findCompanyNames();
	}

	findStockPrice(data) {

		var stockCd = data.stockCd;

		const httpOptions = {

			headers: new HttpHeaders({
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': 'my-auth-token',
				'responseType': 'application/json;charset=UTF-8'
			}),
			params: new HttpParams().append('stockCd', stockCd)
		};

		var url = fsdconfig.chart + "/pricedetail";
		this.http.post < any > (url, "", httpOptions).subscribe(
			(val) => {
				if(val.status == -1) {

					alert(val.retMsg);

				} else {

					this.priceData = val;
					this.setWeek();
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
			legend: {
				data: ['500112']
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

		this.priceList = this.priceData.weekList;
		this.lineOption.xAxis.data = this.priceList.dates;
		this.lineOption.series[0].data = this.priceList.values;
		this.lineOption.legend = {

			data: [this.searchForm.value.stockCd]
		};

		this.echartsIntance.setOption(this.lineOption);

	}
	setMonth() {

		this.priceList = this.priceData.monthList;
		this.lineOption.xAxis.data = this.priceList.dates;
		this.lineOption.series[0].data = this.priceList.values;
		this.lineOption.legend = {
			data: [this.searchForm.value.stockCd]
		};
		this.echartsIntance.setOption(this.lineOption);

	}

	setQuarter() {

		this.priceList = this.priceData.quarterList;
		this.lineOption.xAxis.data = this.priceList.dates;
		this.lineOption.series[0].data = this.priceList.values;
		this.echartsIntance.setOption(this.lineOption);

	}

	setYear() {

		this.priceList = this.priceData.yearList;
		this.lineOption.xAxis.data = this.priceList.dates;
		this.lineOption.series[0].data = this.priceList.values;
		this.echartsIntance.setOption(this.lineOption);
	}

	exportTable() {

		alert("export data");
	}
}