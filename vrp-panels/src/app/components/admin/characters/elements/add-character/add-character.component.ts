import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AccountService } from '../../../../../service/account.service';
import { CharacterModel } from '../../../../../models/CharacterModel';

export interface Gender {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AddCharacterComponent implements OnInit {
  private _genders: Gender[] = [
    {value: false, viewValue: 'Kobieta'},
    {value: true, viewValue: 'Mężczyzna'},
  ];
  private _characterModel: CharacterModel;

  constructor(
    private _dialogRef: MatDialogRef<AddCharacterComponent>,
    private _accountService: AccountService
  ) {
  }

  ngOnInit() {
    this._characterModel = new CharacterModel();
  }

  saveHandler(): void {
    this._dialogRef.close(this._characterModel);
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  loadAccountHandler(value: number): void {
    this._accountService.getById(value)
      .subscribe(data => this._characterModel.account = data);
  }
}