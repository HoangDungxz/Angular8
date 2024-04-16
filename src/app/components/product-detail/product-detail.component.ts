import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { TourService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../models/product';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product = new Product();
  tour: any;
  soluong: number = 0;
  constructor(private tours: TourService,
    private dataSrv: DataService,
    private _router: ActivatedRoute,
    private cartSv: CartService,
    private ToastrService: ToastrService
  ) { }
  // owl
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }
  // phương thức
  ngOnInit(): void {
    this._router.paramMap.subscribe(query => {
      let id = query.get('id');
      this.tours.getProductId(id).subscribe(res => {
        this.products = res.data[0];
      });
    });
    this._router.queryParams.subscribe(query => {
      let key = '';
      if (query.key) {
        key = query.key;
      }
      let orderBy = 'name';
      let orderType = 'ASC';
      this.tours.getOrderBy(orderBy, orderType, key).subscribe(res => {
        if (res.statusCode == 404) {
          this.tour = [];
        } else {
          this.tour = res.data;
        }
      });
    });
  } 
  decNumber() {
    if (this.soluong >= 1) {
      this.soluong -= 1
      if (this.soluong >= 1) {
        this.cartSv.onDecNumber(this.soluong);
      }
    }
  }
  incNumber() {
    this.soluong += 1
    this.cartSv.onIncNumber(this.soluong);
  }
  onAddCart(pro: any) {
    if (this.soluong > 0) {
      this.cartSv.add(pro).subscribe(res => {
        this.dataSrv.senData(this.cartSv.getQuantity());
        this.ToastrService.success('Đã thêm vào giỏ hàng');
      });
    }
  }

}