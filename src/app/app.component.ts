import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataTableDirective } from 'angular-datatables';
import { RestApiService } from './shared/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{

  //dtElement: DataTableDirective ;
//dtInstance: Promise<DataTables.Api> ;

  constructor(public restApi: RestApiService) { 
    
  }
  ngOnInit(): void {
    this.loadSales();
  }

  title = 'MFP-POC';
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: '2021',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
    }
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    }
  ]
  dataSource = new MatTableDataSource<SalesDataElement>(BLANK_ELEMENT_DATA);
  Sales: any = {};

  jsonData : any = [
      
  ];
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.loadSales();
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
      console.log(NEW_ELEMENT_DATA);
      this.jsonData = NEW_ELEMENT_DATA;

      var chartSalesArray = new Array();
      this.Sales.retailSalesSummary.forEach( (element:any) => {
          chartSalesArray.push(element.qty );
      });
      this.chartData[0].data = chartSalesArray;
    });

  }

} // end class

export interface SalesDataElement {
  region: string;
  zone: number;
  district: number;
  code: string;
  dname: string;
}
var BLANK_ELEMENT_DATA: SalesDataElement[] = [
  
];