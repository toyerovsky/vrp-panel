import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { AccountModel } from '../../models/AccountModel';
import { TrustedStyleService } from '../../service/trusted-style.service';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.css']
})
export class AppRootComponent implements OnInit {
  private _accountModel: AccountModel;

  constructor(
    private _accountService: AccountService) {
  }

  ngOnInit() {
    this._accountService.getById(this._accountService.currentUserId).subscribe(account => {
      this._accountModel = account;
    });
  }
}
