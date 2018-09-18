import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CharacterModel } from '../../../../../models/CharacterModel';
import { AccountService } from '../../../../../service/account.service';

export interface Gender {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class EditCharacterComponent implements OnInit {
  private _genders: Gender[] = [
    { value: false, viewValue: 'Kobieta' },
    { value: true, viewValue: 'Mężczyzna' },
  ];

  constructor(
    private _dialogRef: MatDialogRef<EditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public characterModel: CharacterModel,
    private _accountService: AccountService
  ) {
  }

  ngOnInit() {
  }

  saveHandler(): void {
    this._dialogRef.close(this.characterModel);
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  loadAccountHandler(value: number): void {
    this._accountService.getById(value)
      .subscribe(data => this.characterModel.account = data);
  }
}
