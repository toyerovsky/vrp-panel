import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CharacterModel } from '../../../../../models/CharacterModel';

export interface Gender {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-admin-edit-character',
  templateUrl: './admin-edit-character.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminEditCharacterComponent implements OnInit {
  private _genders: Gender[] = [
    { value: false, viewValue: 'Kobieta' },
    { value: true, viewValue: 'Mężczyzna' },
  ];

  constructor(
    private _dialogRef: MatDialogRef<AdminEditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public characterModel: CharacterModel,
    private _accountService: AccountService
  ) {
  }

  ngOnInit() {
  }

  saveHandler(): void {
    this._dialogRef.close(this.characterModel)
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  loadAccountHandler(value: number): void {
    this._accountService.getById(value)
      .subscribe(data => this.characterModel.account = data);
  }
}
