import { GENDERS } from './../../../../../const/Names';
import { CharacterModel } from './../../../../../models/CharacterModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent implements OnInit {
  private _addCharacterForm: FormGroup;
  private _genders = GENDERS;
  private _characterModel: CharacterModel = new CharacterModel();

  constructor(
    private _dialogRef: MatDialogRef<AddCharacterComponent>
  ) { }

  ngOnInit() {
    this._addCharacterForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required
      ]),
      'surname': new FormControl('', [
        Validators.required
      ]),
      'gender': new FormControl('', [
        Validators.required
      ]),
      'bornDate': new FormControl('', [
        Validators.required
      ]),
      'model': new FormControl(''),
    });
  }

  get name() {
    return this._addCharacterForm.controls.name as FormControl;
  }

  get surname() {
    return this._addCharacterForm.controls.surname as FormControl;
  }

  get gender() {
    return this._addCharacterForm.controls.gender as FormControl;
  }

  get bornDate() {
    return this._addCharacterForm.controls.bornDate as FormControl;
  }

  get model() {
    return this._addCharacterForm.controls.model as FormControl;
  }

  onSubmit(): void {
    if (this._addCharacterForm.valid) {
      Object.assign(this._characterModel, this._addCharacterForm.value);
      this._dialogRef.close(this._characterModel);
    }
  }

  closeDialog(): void {
    this._dialogRef.close();
  }
}
