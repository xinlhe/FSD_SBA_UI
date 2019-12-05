import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bluechart',
  templateUrl: './bluechart.component.html',
  styleUrls: ['./bluechart.component.css']
})
export class BluechartComponent implements OnInit {

	echartsIntance;
  constructor() { }

  ngOnInit() {
  }
  
  onChartInit(ec) {     
         this.echartsIntance = ec;
  }

  dates=[
			'2013/01/02','2013/01/03','2013/01/04','2013/01/05',
			'2013/01/08','2013/01/09','2013/01/10','2013/01/11','2013/01/12',
			'2013/01/15','2013/01/16','2013/01/17','2013/01/18','2013/01/19',
			'2013/01/22','2013/01/23','2013/01/24','2013/01/25','2013/01/26',
			'2013/02/01','2013/02/02','2013/02/03','2013/02/04','2013/02/05'
		];
	stockdata=[820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320];	
        // specify chart configuration item and data
	lineOption = {
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
			data: this.dates
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: this.stockdata,
			type: 'line'
		}]
	};

	setMonth(){
		this.dates=[
			'2013/01/02','2013/01/03','2013/01/04','2013/01/05',
			'2013/01/08','2013/01/09','2013/01/10','2013/01/11','2013/01/12',
			'2013/01/15','2013/01/16','2013/01/17','2013/01/18','2013/01/19',
			'2013/01/22','2013/01/23','2013/01/24','2013/01/25','2013/01/26',
			'2013/02/01','2013/02/02','2013/02/03','2013/02/04','2013/02/05'
		];
	}
	set6Month(){
		this.dates=[
			'2013/01/02','2013/01/03','2013/01/04','2013/01/05',
			'2013/01/08','2013/01/09','2013/01/10','2013/01/11','2013/01/12',
			'2013/01/15','2013/01/16','2013/01/17','2013/01/18','2013/01/19',
			'2013/01/22','2013/01/23','2013/01/24','2013/01/25','2013/01/26',
			'2013/02/01','2013/02/02','2013/02/03','2013/02/04','2013/02/05',
			'2013/02/08','2013/02/09','2013/02/10','2013/02/11','2013/02/12',
			'2013/02/15','2013/02/16','2013/02/17','2013/02/18','2013/02/19',
			'2013/02/22','2013/02/23','2013/02/24','2013/02/25','2013/02/26',
			'2013/03/01','2013/03/02','2013/03/03','2013/03/04','2013/03/05',
			'2013/03/08','2013/03/09','2013/03/10','2013/03/11','2013/03/12',
			'2013/03/15','2013/03/16','2013/03/17','2013/03/18','2013/03/19',
			'2013/03/22','2013/03/23','2013/03/24','2013/03/25','2013/03/26'
		];
		
		//this.lineOption.xAxis.data.push("2014/01/01"); //work
		this.lineOption.xAxis.data=this.dates;
		this.lineOption.series[0].data.push(2222) ;
		//alert(this.lineOption.xAxis.data+"\r\n"+this.lineOption.series[0].data);		
		//this.echartsIntance.setOption(this.lineOption,true);
		this.echartsIntance.setOption(this.lineOption);
		
	}
	setYear(){}
	
}
