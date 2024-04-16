import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Array<any> = new Array();
  soluong: number = 1;
  totalQtt: any;
  totalPrice: any;

  constructor() {
    this.cart = this.getItem();
    let cartsession = sessionStorage.getItem('cart');
    if (cartsession) {
      this.cart = JSON.parse(cartsession);
      this.totalQtt = this.getQuantity();
      this.totalPrice = this.getPrice();
    }
  }
  onDecNumber(soluong: number): number {
    if (this.soluong >= 1) {
      return this.soluong = soluong
    }
    return 0
  }
  onIncNumber(soluong: number): number {
    return this.soluong = soluong;
  }
  add(pro: any): Observable<any> {
    let key = this.checkItemExists(pro.id);
    if (key !=  -1) {
      this.cart[key].quantity += this.soluong;
    } else {
      let cartItem = {
        id: pro.id,
        name: pro.name,
        price: pro.sale_price > 0 ? pro.sale_price : pro.price,
        image: pro.image,
        quantity: this.soluong
      };
      this.cart.push(cartItem);
    }
    let cartJson = JSON.stringify(this.cart);
    sessionStorage.setItem('cart', cartJson);
    return new Observable((observer) => {
      observer.next(this.cart);
    });
  }
  getItem(): Array<any> {
    let cartItem: Array <any> = new Array();
    let cartInsession = sessionStorage.getItem('cart');
    if (cartInsession) {
      cartItem = JSON.parse(cartInsession);
    }
    return cartItem
  }
  checkItemExists(id: number): any {
    for (let i = 0; i < this.getItem().length;i++) {
      if (this.getItem()[i].id == id) {
        return i;
      }
    }
    return -1;
  }
  removeItem(key:any) {
    this.cart = this.getItem();
    this.cart.splice(key, 1);
    let cartJson = JSON.stringify(this.cart);
    sessionStorage.setItem('cart', cartJson);
    return this.cart;
  }
  updateQuantity(id: number, quantity: number) {
    this.cart = this.getItem();
    let key = this.checkItemExists(id);
    if (key != -1) {
      this.cart[key].quantity = quantity;
    }
    let cartJson = JSON.stringify(this.cart);
    sessionStorage.setItem('cart', cartJson);
    return this.cart;
  }
  getQuantity() {
    let total = 0;
    for (let i = 0; i < this.getItem().length; i++) {
      total += this.getItem()[i].quantity;
    }
    return total;
  }
  getPrice() {
    let total = 0;
    for (let i = 0; i < this.getItem().length; i++) {
      total += this.getItem()[i].quantity * this.getItem()[i].price;
    }
    return total;
  }
  clearCart() {
    sessionStorage.removeItem('cart');
    return [];
  }
}
