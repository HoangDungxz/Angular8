import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const acc_api = 'http://localhost:3000/admin/account/api/';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  register(data:any):Observable<any>{
    return this.http.post<any>(acc_api + 'create?is_angular=true', data);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(acc_api + 'login?is_angular=true', data);
  }
  update(data: any): Observable<any> {
    return this.http.post<any>(acc_api + 'update?is_angular=true', data);
  }
}
