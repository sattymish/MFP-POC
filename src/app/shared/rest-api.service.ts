import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sales } from './sales';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // Define API
  apiURL = 'http://34.123.143.171:8090';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch sales data
  getSales(): Observable<Sales> {
    return this.http.get<Sales>(this.apiURL + '/mfp/sales/retail-sales?year=2021')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  // HttpClient API get() method => Fetch sales data
  getDailySalesRate(): Observable<Sales> {
    return this.http.get<Sales>(this.apiURL + '/mfp/sales/daily-sales-rate?year=2021')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch sales data
  getCarlineSales(): Observable<any> {
    return this.http.post<any>(this.apiURL + '/mfp/sales/retail-carline-sales',{"year": 2021})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // Error handling 
  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
