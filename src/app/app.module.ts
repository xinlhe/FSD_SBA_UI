import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxEchartsModule} from 'ngx-echarts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { CompanyupdateComponent } from './companyupdate/companyupdate.component';
import { ExchangelistComponent } from './exchangelist/exchangelist.component';
import { ExchangeaddComponent } from './exchangeadd/exchangeadd.component';
import { IpoplanComponent } from './ipoplan/ipoplan.component';
import { FsdchartComponent } from './chart/fsdchart/fsdchart.component';
import { BluechartComponent } from './chart/bluechart/bluechart.component';
import { SinglestockchartComponent } from './chart/singlestockchart/singlestockchart.component';
import { SinglesectorchartComponent } from './chart/singlesectorchart/singlesectorchart.component';
import { MulstockchartComponent } from './chart/mulstockchart/mulstockchart.component';
import { MulsectorchartComponent } from './chart/mulsectorchart/mulsectorchart.component';
import { StocksectorchartComponent } from './chart/stocksectorchart/stocksectorchart.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    CompanylistComponent,
    CompanyupdateComponent,
    ExchangelistComponent,
    ExchangeaddComponent,
    IpoplanComponent,
    FsdchartComponent,
    BluechartComponent,
    SinglestockchartComponent,
    SinglesectorchartComponent,
    MulstockchartComponent,
    MulsectorchartComponent,
    StocksectorchartComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
	ReactiveFormsModule,
	NgxEchartsModule,
	RouterModule.forRoot([
	{ path: 'signin', component: SigninComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'companylist', component: CompanylistComponent },
	{ path: 'companyupdate', component: CompanyupdateComponent },
	{ path: 'exchangelist', component: ExchangelistComponent },
	{ path: 'exchangeadd', component: ExchangeaddComponent },
	{ path: 'fsdchart', component: FsdchartComponent },	
	{ path: 'bluechart', component: BluechartComponent },
	{ path: 'singlestockchart', component: SinglestockchartComponent },	
	{ path: 'singlesectorchart', component: SinglesectorchartComponent },	
	{ path: 'mulstockchart', component: MulstockchartComponent },	
	{ path: 'mulsectorchart', component: MulsectorchartComponent },	
	{ path: 'stocksectorchart', component: StocksectorchartComponent },	
	{ path: 'upload', component: UploadComponent },	
	{ path: 'ipoplan', component: IpoplanComponent }
	])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
