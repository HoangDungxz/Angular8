import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup = new FormGroup({});
  submited: boolean = false;

  constructor(private fd: FormBuilder,private accSrv: AccountService,private router:Router) { }

  ngOnInit(): void {
    this.formRegister = this.fd.group({
      Name: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() { return this.formRegister.controls;}

  onSubmit(): any {
    this.submited = true;
    if (this.formRegister.invalid) {
      return false;
    }
    this.accSrv.register(this.formRegister.value).subscribe(res => {
      if (res.statusCode == 200) {
        this.router.navigate(['/login']);
      }
    });
  }
}
