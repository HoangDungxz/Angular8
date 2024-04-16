import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  tour: any;
  cat: any;
  order: any;
  p: number = 1;
  constructor(private tours: TourService, private _router: ActivatedRoute) { }

  ngOnInit(): void {    
    this._router.queryParams.subscribe(query => {
      let key = '';
      if (query.key) {
        key = query.key;
      }
      let orderBy ='name';
      let orderType ='ASC'; 
      this.tours.getOrderBy(orderBy, orderType, key).subscribe(res => {
        if (res.statusCode == 404) {
          this.tour = [];
        } else {
          this.tour = res.data;
        }
      });
    });
    this.tours.getCaName().subscribe(res => {
      this.cat = res.data;
    });
  }
  
  getByCaId(id: any) {
    this.tours.getCaId(id).subscribe(res => {
      if (res.statusCode == 404) {
        this.tour = [];
      } else {
        this.tour = res.data;
      }
    });
  }

  getOrderBy(event: any) {
    let order = event.target.value;
    let key = '';
    let orders = order.split('-');
    let orderBy = orders && orders[0] ? orders[0]:'name';
    let orderType = orders && orders[1] ? orders[1]:'ASC';
    this.tours.getOrderBy(orderBy, orderType, key).subscribe(res => {
      if (res.statusCode == 404) {
        this.tour = [];
      } else {
        this.tour = res.data;
      }
    });
  }
}
