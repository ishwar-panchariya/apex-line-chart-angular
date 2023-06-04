import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  apiUrl = 'localhost:4200/subscriptions/revenue/graph?dateRange=year'
  token = ''
  
  constructor(private http: HttpClient) { }

  getReports() {
    return this.http.get(this.apiUrl, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}`} })
  }
}
