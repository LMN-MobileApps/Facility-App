import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  validateLogin(req): Observable<any> {
    let url = environment.serviceUrl + 'userLogin'
    return this.http.post(url,req, {responseType: "text"});
  }
}