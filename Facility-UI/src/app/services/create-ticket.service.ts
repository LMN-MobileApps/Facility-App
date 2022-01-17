import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {
  serviceURL = environment.serviceUrl
  constructor(private http: HttpClient, private router: Router) { }

  
  fetchAllLocations() {
    const url = this.serviceURL + 'getAllLocation';
    return this.http.get<any>(url);
  }

  fetchAllServices() {
    const url = this.serviceURL + 'getAllTicketServices';
    return this.http.get<any>(url);
  }
}