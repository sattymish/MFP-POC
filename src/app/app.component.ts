import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements AfterViewInit{

  title = 'MFP-POC';
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
  public barChartLabels: string[] = ["Jan 21", "Feb 21", "Mar 21", "Apr 21", "May 21", "Jun 21", "Jul 21", "Aug 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
  
  public barChartType: string = 'roundedBar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 81, 56, 55, 40, 55], label: 'Sales Unit', backgroundColor: "#003696"},
      {data: [28, 48, 40, 19, 86, 27, 90, 81, 56, 55, 40, 55], label: 'Comparative Unit', backgroundColor: "#2c77ff",},
      {data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100], label: 'Series C', backgroundColor: "#e6f3ff",  borderRadius: "40px",}];

  public changeData(): any{
    this.barChartData = [
      {data: [10, 2, 80, 81, 36, 55, 40, 81, 56, 55, 40, 55], label: 'Series D', backgroundColor: "rgba(63,103,126,1)",},
      {data: [28, 87, 40, 19, 67, 27, 9, 81, 56, 55, 40, 55], label: 'Series E', backgroundColor: "rgba(63,103,126,1)",},
      {data: [18, 48, 66, 9, 58, 27, 40, 81, 56, 55, 40, 55], label: 'Series F', backgroundColor: "rgba(63,103,126,1)",}
    ];
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

	
	
   jsonData : any = [  {Region: 'NE', Zone: 1, Distinct: 1, Dealer: 'Dealer A', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 2, Distinct: 1, Dealer: 'Dealer B', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 3, Distinct: 1, Dealer: 'Dealer C', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 4, Distinct: 1, Dealer: 'Dealer D', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 5, Distinct: 1, Dealer: 'Dealer E', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 6, Distinct: 1, Dealer: 'Dealer F', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 7, Distinct: 1, Dealer: 'Dealer G', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 8, Distinct: 1, Dealer: 'Dealer H', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 9, Distinct: 1, Dealer: 'Dealer I', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 10, Distinct: 1, Dealer: 'Dealer J', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 11, Distinct: 1, Dealer: 'Dealer J', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 12, Distinct: 1, Dealer: 'Dealer J', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 13, Distinct: 1, Dealer: 'Dealer J', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 14, Distinct: 1, Dealer: 'Dealer J', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 15, Distinct: 1, Dealer: 'Dealer J', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},
 {Region: 'NE', Zone: 16, Distinct: 1, Dealer: 'Dealer J', Jan: '100', Feb: '90', Mar: '200', Apr: '129', May: '39', Jun: '150', Jul: '120', Aug: '100', Sep: '90', Oct: '249', Nov: '211', Dec: '162', Total: '78'},];
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }
}

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