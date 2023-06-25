/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(url:string): Observable<any> {

    return this.http.get<any>(url);
  }
  post(url:string): Observable<any> {

    return this.http.get<string>(url);
  }


}
