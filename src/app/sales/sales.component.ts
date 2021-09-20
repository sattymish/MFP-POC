
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CarLineComponent } from '../car-line/car-line.component';
import { RestApiService } from '../shared/rest-api.service';


@Component({
  
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements AfterViewInit {

 constructor(public restApi: RestApiService) { }
 Sales: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  toggleGroup: any;
  chartType: any='bar';

  changeChartType(selectedChartType:any){    
    console.log("ChartType - ", selectedChartType);  
    this.chartType= selectedChartType;
  }

 public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true, 

	//Border radius; Default: 0; If a negative value is passed, it will overwrite to 0;
  cornerRadius: 10, 

    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };

  public chartColors: Array < any > = [{
    backgroundColor: ['#003696', '#212529', '#797979', '#b2b9e8', '#6670b5', '#343f88', '#060a27'],
    borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
  }];

  public barChartLabels: string[] = ["Jan 21", "Feb 21", "Mar 21", "Apr 21", "May 21", "Jun 21", "Jul 21", "Aug 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
  
  public barChartType: string = 'roundedBar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [], label: 'Sales Unit', backgroundColor: "#003696"}
    //{data: [], label: 'Sales Unit', backgroundColor: "#003696"}
    ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<SalesDataElement>(BLANK_ELEMENT_DATA);

   jsonData : any ;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.loadSales();
    
  }

  tabClick(tab: any){
    
    if(tab.index == 0){
      console.log("Retail units sold");
      this.loadSales();
    }else if(tab.index == 1) {
      console.log("Retail units sold per car line");
      this.loadCarlineSales();
    }else if(tab.index == 2) {
      console.log("Daily sales rate");
      this.loadDailySalesRate();
    }
    
  }

  loadCarlineSales() {
    return this.restApi.getCarlineSales().subscribe( data =>{
      console.log(data);
      var response = data.retailSalesCarline;
      //this.barChartData[1].data = ['850', '460','679', '1024'];
      //this.barChartData[0].data = ['150', '120','25', '250'];
      this.barChartData.length=0;
      //CX9
      this.barChartData.push({data:[], label: 'CX9', backgroundColor: "#003696"});
      response.CX9.forEach( (element:any) => {
        this.barChartData[0].data.push(element.qty);
      });
      //MX#
      this.barChartData.push({data:[], label: 'MX3', backgroundColor: "#00696"});
      response.MX3.forEach( (element:any) => {
        this.barChartData[1].data.push(element.qty);
      });
      //MX#
      this.barChartData.push({data:[], label: 'MX2', backgroundColor: "#003650"});
      response.MX3.forEach( (element:any) => {
        this.barChartData[2].data.push(element.qty);
      });
      //this.barChartData.push({data: ['850', '460','679', '1024'], label: 'CX9', backgroundColor: "#00696"});
      //this.barChartData.push({data: ['150', '120','25', '250'], label: 'MX3', backgroundColor: "#003696"});
    });
  }

  loadSales() {
    return this.restApi.getSales().subscribe((data: {}) => {
      this.Sales = data;
      var NEW_ELEMENT_DATA = new Array();
      this.Sales.retailSales.forEach( (element:any) => {
        var screenData = {
                            dealer: {}, 
                            salesData: {
                                month1:{qty:''},
                                month2:{qty:''},
                                month3:{qty:''},
                                month4:{qty:''},
                                month5:{qty:''},
                                month6:{qty:''},
                                month7:{qty:''},
                                month8:{qty:''},
                                month9:{qty:''},
                                month10:{qty:''},
                                month11:{qty:''},
                                month12:{qty:''},
                              } 
                        };
        screenData.dealer = element.dealer;
        element.monthFeeds.forEach( (monthFeed:any) => {
          if(monthFeed.month === '1')
            screenData.salesData.month1.qty=monthFeed.qty;
          if(monthFeed.month == '2')
            screenData.salesData.month2.qty=monthFeed.qty;
          if(monthFeed.month == '3')
            screenData.salesData.month3.qty=monthFeed.qty;
          if(monthFeed.month == '4')
            screenData.salesData.month4.qty=monthFeed.qty;
          if(monthFeed.month == '5')
            screenData.salesData.month5.qty=monthFeed.qty;
          if(monthFeed.month == '6')
            screenData.salesData.month6.qty=monthFeed.qty;
          if(monthFeed.month == '7')
            screenData.salesData.month7.qty=monthFeed.qty;
          if(monthFeed.month == '8')
            screenData.salesData.month8.qty=monthFeed.qty;
          if(monthFeed.month == '9')
            screenData.salesData.month9.qty=monthFeed.qty;
          if(monthFeed.month == '10')
            screenData.salesData.month10.qty=monthFeed.qty;
          if(monthFeed.month == '11')
            screenData.salesData.month11.qty=monthFeed.qty;
          if(monthFeed.month == '12')
            screenData.salesData.month12.qty=monthFeed.qty;
        });
        NEW_ELEMENT_DATA.push(screenData);
      });
      console.log('data to show on screen for chart type'+this.toggleGroup);
      console.log(NEW_ELEMENT_DATA);
      this.jsonData = NEW_ELEMENT_DATA;

      var chartSalesArray = new Array();
      this.Sales.retailSalesSummary.forEach( (element:any) => {
          chartSalesArray.push(element.qty );
      });
      //this.chartData[0].data = chartSalesArray;
      console.log(chartSalesArray);
      this.barChartData.length=0;
      this.barChartData = [
        {data: [], label: 'Sales Unit', backgroundColor: "#003696"}
        //{data: [], label: 'Sales Unit', backgroundColor: "#003696"}
        ];
      this.barChartData[0].data = chartSalesArray;
      this.dtTrigger.next();
    });
    
  }// end load sales

  loadDailySalesRate() {
    return this.restApi.getDailySalesRate().subscribe((data: {}) => {
      this.Sales = data;
      var NEW_ELEMENT_DATA = new Array();
      this.Sales.retailSales.forEach( (element:any) => {
        var screenData = {
                            dealer: {}, 
                            salesData: {
                                month1:{qty:''},
                                month2:{qty:''},
                                month3:{qty:''},
                                month4:{qty:''},
                                month5:{qty:''},
                                month6:{qty:''},
                                month7:{qty:''},
                                month8:{qty:''},
                                month9:{qty:''},
                                month10:{qty:''},
                                month11:{qty:''},
                                month12:{qty:''},
                              } 
                        };
        screenData.dealer = element.dealer;
        element.monthFeeds.forEach( (monthFeed:any) => {
          if(monthFeed.month === '1')
            screenData.salesData.month1.qty=monthFeed.qty;
          if(monthFeed.month == '2')
            screenData.salesData.month2.qty=monthFeed.qty;
          if(monthFeed.month == '3')
            screenData.salesData.month3.qty=monthFeed.qty;
          if(monthFeed.month == '4')
            screenData.salesData.month4.qty=monthFeed.qty;
          if(monthFeed.month == '5')
            screenData.salesData.month5.qty=monthFeed.qty;
          if(monthFeed.month == '6')
            screenData.salesData.month6.qty=monthFeed.qty;
          if(monthFeed.month == '7')
            screenData.salesData.month7.qty=monthFeed.qty;
          if(monthFeed.month == '8')
            screenData.salesData.month8.qty=monthFeed.qty;
          if(monthFeed.month == '9')
            screenData.salesData.month9.qty=monthFeed.qty;
          if(monthFeed.month == '10')
            screenData.salesData.month10.qty=monthFeed.qty;
          if(monthFeed.month == '11')
            screenData.salesData.month11.qty=monthFeed.qty;
          if(monthFeed.month == '12')
            screenData.salesData.month12.qty=monthFeed.qty;
        });
        NEW_ELEMENT_DATA.push(screenData);
      });
      console.log('data to show on screen for chart type'+this.toggleGroup);
      console.log(NEW_ELEMENT_DATA);
      this.jsonData = NEW_ELEMENT_DATA;

      var chartSalesArray = new Array();
      this.Sales.retailSalesSummary.forEach( (element:any) => {
          chartSalesArray.push(element.qty );
      });
      //this.chartData[0].data = chartSalesArray;
      this.barChartData.length=0;
      this.barChartData = [
        {data: [], label: 'Sales Rate', backgroundColor: "#003696"}
        //{data: [], label: 'Sales Unit', backgroundColor: "#003696"}
        ];
      this.barChartData[0].data = chartSalesArray;
    });

  }
}

export interface SalesDataElement {
  region: string;
  zone: number;
  district: number;
  code: string;
  dname: string;
}
var BLANK_ELEMENT_DATA: SalesDataElement[] = [
  
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

