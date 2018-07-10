import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import * as bcrypt from 'bcrypt';
import { LoginViewModel } from '../viewModels/LoginViewModel';
import { AccountService } from '../service/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  private _loginModel: LoginViewModel;
  private _matcher = new ErrorStateMatcher();

  constructor(
    private _accountService: AccountService,
    private _toastrService: ToastrService,
    private _router: Router) {
  }

  ngOnInit() {
  }

  loginClickHandler() {
    this._accountService.getByEmail(this._loginModel.email).subscribe(account => {
      bcrypt.hash(this._loginModel.password, `$2a$13$${account.passwordSalt}`).then(result => {
        this._accountService.login(this._loginModel.email, result).subscribe(data => {
          if (data === undefined) {
            setTimeout(() => this._toastrService.error('Podane dane logowania są niepoprawne.'));
          } else {
            this._router.navigate(["player/characters"]);
            setTimeout(() => this._toastrService.success(`Logowanie pomyślne.`));
          }
        });
      });
    });
  }
}
