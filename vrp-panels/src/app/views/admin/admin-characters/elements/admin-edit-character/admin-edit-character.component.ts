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
  styleUrls: ['./admin-edit-character.component.css']
})
export class AdminEditCharacterComponent implements OnInit {
  private _genders: Gender[] = [
    { value: false, viewValue: 'Kobieta' },
    { value: true, viewValue: 'Mężczyzna' },
  ];

  constructor(
    private _dialogRef: MatDialogRef<AdminEditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public characterModel: CharacterModel
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
}
