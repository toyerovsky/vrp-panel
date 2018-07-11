import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CharacterService } from '../../../../../service/character.service';
import { CharacterModel } from '../../../../../models/CharacterModel';

export interface Gender {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-admin-add-character',
  templateUrl: './admin-add-character.component.html',
  styleUrls: ['./admin-add-character.component.css']
})
export class AdminAddCharacterComponent implements OnInit {
  private _genders: Gender[] = [
    { value: false, viewValue: 'Kobieta' },
    { value: true, viewValue: 'Mężczyzna' },
  ];
  private _characterModel: CharacterModel;

  constructor(
    private _dialogRef: MatDialogRef<AdminAddCharacterComponent>,
  ) {
  }

  ngOnInit() {
    this._characterModel = new CharacterModel();
  }

  saveHandler(): void {
    this._dialogRef.close(this._characterModel)
  }

  closeDialog(): void {
    this._dialogRef.close();
  }
}