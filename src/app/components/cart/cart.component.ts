import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  item: Array<any> = new Array<any>();
  totalQtt: any;
  totalPrice: any;
  constructor(private catRsv: CartService, private dataSrv: DataService, private ToastrService: ToastrService) {
    this.totalQtt = this.catRsv.totalQtt;
    this.totalPrice = this.catRsv.totalPrice;
   }

  ngOnInit(): void {
    this.item = this.catRsv.getItem();
  }
  
  onDelete(id:number) {
    let key = this.catRsv.checkItemExists(id);
    this.item = this.catRsv.removeItem(key);
    this.totalPrice = this.catRsv.getPrice();
    this.dataSrv.senData(this.catRsv.getQuantity());
    this.ToastrService.success('Đã Xóa Sản Phẩm Thành Công');
  }
  onUpdate(event: any) {
    let id = event.target.id;
    let quantity = event.target.value;
    if (quantity >= 0) {
      this.item = this.catRsv.updateQuantity(id, quantity);
      this.totalPrice = this.catRsv.getPrice();
      this.dataSrv.senData(this.catRsv.getQuantity());
    }
  }
  onClear() {
    if (confirm('Bạn có chắc muốn xóa tất cả chứ')) {
      this.item = this.catRsv.clearCart();
      this.totalPrice = this.catRsv.getPrice();
      this.dataSrv.senData(this.catRsv.getQuantity());
      this.ToastrService.success('Đã Xóa Thành Công');
    }
  }
}
