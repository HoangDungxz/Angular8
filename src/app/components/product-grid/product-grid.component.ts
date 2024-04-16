import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product';
import { DataService } from 'src/app/services/data.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  tour: any;
  cat: any;
  p: number = 1;
  constructor(private tours: TourService,
    private dataSrv: DataService,
    private _router: ActivatedRoute,
    private cartSv: CartService,
    private ToastrService: ToastrService) { }

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
  
  totalItems = 20;
  currentPge = 1;
  getProduct() {
    this.tours.getPage().subscribe(res => {
      if (res.statusCode == 404) {
        this.tour = [];
      } else {
        this.tour = res.data;
      }
    })
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
  onAddCart(pro: any) {
    this.cartSv.add(pro).subscribe(res => {
      this.dataSrv.senData(this.cartSv.getQuantity());
      this.ToastrService.success('Đã thêm vào giỏ hàng');
    });
  }
}