import { Component, OnInit, Inject } from '@angular/core';
import { AccountModel } from '../../../../../models/AccountModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '../../../../../service/account.service';
import { RANKS } from '../../../../../const/Misc';

@Component({
  selector: 'app-admin-edit-account',
  templateUrl: './admin-edit-account.component.html',
  styleUrls: ['./admin-edit-account.component.css']
})
export class AdminEditAccountComponent implements OnInit {
  private _ranks: any = RANKS;

  constructor(
    private _dialogRef: MatDialogRef<AdminEditAccountComponent>,
    private _accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public accountModel: AccountModel
  ) {
  }

  ngOnInit() {

  }

  saveHandler(): void {
    this._dialogRef.close(this.accountModel)
  }

  closeDialog(): void {
    this._dialogRef.close();
  }
}
