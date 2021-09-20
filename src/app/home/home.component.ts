import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public restApi: RestApiService) { }

  tabularData: any;
  jsonData : any ;
  public barChartLabels: string[] = ["Jan 21", "Feb 21", "Mar 21", "Apr 21", "May 21", "Jun 21", "Jul 21", "Aug 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true, 

	//Border radius; Default: 0; If a negative value is passed, it will overwrite to 0;
  cornerRadius: 10, 

    scales: {
      xAxes: [{ stacked: false }],
      yAxes: [{ stacked: false }]
    }
  };
  public barChartLegend: boolean = true;
  chartType: any='bar';

  public barChartData: any[] = [
    {data: [], label: 'Sales Unit', backgroundColor: "#003696"}
    //{data: [], label: 'Sales Unit', backgroundColor: "#003696"}
    ];

  ngOnInit(): void {
    this.loadCarlineSales();
    this.loadSales();
  }

  loadCarlineSales() {
    return this.restApi.getCarlineSales().subscribe( data =>{
      console.log(data);
      var response = data.retailSalesCarline;
      this.tabularData = [];
      //var cx9SalesQty=0;
      var cx9SalesQty = response.CX9[response.CX9.length-1].qty;
      var row1 = {
        index: 1,
        carLine: "CX9",
        qty: cx9SalesQty
      };
      this.tabularData.push(row1);
      //
      var mx3SalesQty = response.MX3[response.MX3.length-1].qty;
      var row2 = {
        index: 1,
        carLine: "MX3",
        qty: mx3SalesQty
      };
      this.tabularData.push(row2);
      //
      var mx3SalesQty = response.MX2[response.MX2.length-1].qty;
      var row3 = {
        index: 1,
        carLine: "MX2",
        qty: mx3SalesQty
      };
      this.tabularData.push(row3);
      console.log("CX9 sales "+ cx9SalesQty);
    });
  }

  Sales: any = {};
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
      //console.log('data to show on screen for chart type'+this.toggleGroup);
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
    });

  }
}




