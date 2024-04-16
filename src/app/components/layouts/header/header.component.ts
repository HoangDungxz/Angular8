import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalQtt: any;
  account: any;
  subscription: Subscription;

  constructor(private catRsv: CartService, private dataSrv: DataService) {
    this.totalQtt = this.catRsv.getQuantity();
    this.subscription = this.dataSrv.getData().subscribe(res => {
      this.totalQtt = res;
    })
   }

  ngOnInit(): void {
    var json = sessionStorage.getItem('accountLogin');
    if (json) {
      this.account = JSON.parse(json);
    }
  }

  onLogOut() {
    this.account = null;
    sessionStorage.removeItem('accountLogin');
  }
}
