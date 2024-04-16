import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { TourService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product = new Product();
  tour: any;

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

  ngOnInit(): void {
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

  onAddCart(pro: any) {
    this.cartSv.add(pro).subscribe(res => {
      this.dataSrv.senData(this.cartSv.getQuantity());
      this.ToastrService.success('Đã thêm vào giỏ hàng');
    });
  }
}
