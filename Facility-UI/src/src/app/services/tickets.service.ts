import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  serviceURL = environment.serviceUrl;
  public httpOptions = {
    headers: new HttpHeaders({
      /* 'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',*/
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      //"Authorization": 'Bearer ' 
    })
  };
  constructor(private http: HttpClient) { }
  fetchAllTickets() {
    const url = this.serviceURL + 'getAllTicketProblemType'
    return this.http.get<any[]>(url);
  }

  fetchDashboardData(req) {
    const url = this.serviceURL + 'dashboard';
    return this.http.post<any[]>(url, req, this.httpOptions);
  }

  filterDashboardDataByCategory(req) {
    const url = this.serviceURL + 'dashboardFilter';
    return this.http.post<any[]>(url, req, this.httpOptions)
  }
}