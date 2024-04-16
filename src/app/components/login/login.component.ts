import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  submited: boolean = false;
  account: any;

  constructor(private fd: FormBuilder, private accSrv: AccountService, private router: Router) { }

  ngOnInit(): void {
    var json = sessionStorage.getItem('accountLogin');
    if (json) {
      this.account = JSON.parse(json);
    }
    this.formLogin = this.fd.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.formLogin.controls; }

  onLogin():any {
    this.submited = true;
    if (this.formLogin.invalid) { return false; }
    this.accSrv.login(this.formLogin.value).subscribe(res => {
      if (res.statusCode == 200) {
        this.account = res.data;
        var jsonString = JSON.stringify(res.data);
        sessionStorage.setItem('accountLogin', jsonString);
      } else {
        alert(res.message);
      }
    });
  }
  onLogOut() {
    this.account = null;
    sessionStorage.removeItem('accountLogin');
  }
}
