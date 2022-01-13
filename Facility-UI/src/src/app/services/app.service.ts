import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public filterByProblemType = new BehaviorSubject(null);
  public loggedInUser = new Subject<any>();
  public currentPage = new Subject<any>();
  serviceURL = environment.serviceUrl
  constructor(private http: HttpClient, private router: Router) { }

  fetchAllProblemTypes() {
    const url = this.serviceURL + 'getAllTicketProblemType';
    return this.http.get<any>(url);
  }

  updateProblemTypeFilter(problemCode) {
    this.filterByProblemType.next(problemCode)
  }

  getUpdatedProblemType(): Observable<any> {
    return this.filterByProblemType.asObservable()
  }

  setLoggedInUser(user) {
    this.loggedInUser.next(user)
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUser.asObservable()
  }

  setCurrentPage(page) {
    this.currentPage.next(page)
  }

  getCurrentPage(): Observable<any> {
    return this.currentPage.asObservable()
  }

  redirectTo(screen) {
    this.setCurrentPage(screen);
    this.router.navigate(['/', screen]);
  }

  redirectToTabs(screen, data) {
    this.setCurrentPage(screen);
    this.router.navigate(['/main/tabs/', screen], data);
  }
}