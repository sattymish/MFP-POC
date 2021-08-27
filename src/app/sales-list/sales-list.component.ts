import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  Sales: any = {};

  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.loadSales()
  }

  loadSales() {
    return this.restApi.getSales().subscribe((data: {}) => {
      console.log(data);
      this.Sales = data;
    })
  }

}
