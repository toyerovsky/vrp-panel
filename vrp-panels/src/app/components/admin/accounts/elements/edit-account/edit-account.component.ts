import { RANK_NAMES } from '../../../../../const/Names';
import { Component, OnInit, Inject } from '@angular/core';
import { AccountModel } from '../../../../../models/AccountModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'admin-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class EditAccountComponent implements OnInit {
  private _ranks: string[] = RANK_NAMES;

  constructor(
    private _dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public accountModel: AccountModel
  ) {
  }

  ngOnInit() {
  }

  saveHandler(): void {
    this._dialogRef.close(this.accountModel);
  }

  closeDialog(): void {
    this._dialogRef.close();
  }
}
