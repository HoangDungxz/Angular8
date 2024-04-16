import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }
  get(key :any) {
    return this.http.get<any>('http://localhost:3000/admin/tours/api/?is_angular=true&&?search=' + key);
  }
  getProductId(id: any) {
    return this.http.get<any>('http://localhost:3000/admin/tours/api/detail/' + id + '/?is_angular=true' );
  } 
  getPage() {
    return this.http.get<any>('http://localhost:3000/admin/tours/api/?is_angular=true');
  }
  getCaId(ca_Id: any) {
    return this.http.get<any>('http://localhost:3000/admin/tours/api/explore/' + ca_Id + '/?is_angular=true');
  }
  getCaName() {
    return this.http.get<any>('http://localhost:3000/admin/category/api/?is_angular=true');
  }
  getOrderBy(orderBy: any, orderType:any,search:any) {
    return this.http.get<any>('http://localhost:3000/admin/tours/api/orderby/?is_angular=true&&?orderby=' + orderBy + '&&collocation=' + orderType + '&&search=' + search);
  }
}
