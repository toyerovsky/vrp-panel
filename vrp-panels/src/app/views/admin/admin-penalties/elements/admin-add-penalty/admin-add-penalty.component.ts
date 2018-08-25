import { defaultIfEmpty, map, every, tap } from 'rxjs/operators';
import { AccountModel } from './../../../../../models/AccountModel';
import { catchError, finalize } from 'rxjs/operators';
import { PenaltyType } from './../../../../../enums/PenaltyType';
import { CharacterService } from './../../../../../service/character.service';
import { AccountService } from './../../../../../service/account.service';
import { MatDialogRef } from '@angular/material';
import { PenaltyModel } from './../../../../../models/PenaltyModel';
import { PENALTY_TYPES } from './../../../../../const/Names';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { noCharacterWithId, noAccountWithId, requiredIfValues } from '../../../../../utils/Validator';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-add-penalty',
  templateUrl: './admin-add-penalty.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminAddPenaltyComponent implements OnInit {
  private _penaltyTypes = PENALTY_TYPES;
  private _addPenaltyForm: FormGroup;
  private _penaltyModel: PenaltyModel = new PenaltyModel();

  constructor(
    private _dialogRef: MatDialogRef<AdminAddPenaltyComponent>,
    private _characterService: CharacterService,
    private _accountService: AccountService
  ) {
  }

  ngOnInit() {
    this._addPenaltyForm = new FormGroup({
      'penaltyType': new FormControl(this._penaltyModel.penaltyType, [
        Validators.required
      ]),
      'expiryDate': new FormControl(this._penaltyModel.expiryDate, [
        Validators.required
      ]),
      'reason': new FormControl(this._penaltyModel.reason, [
        Validators.required
      ]),
      'accountId': new FormControl(this._penaltyModel.accountId),
      'characterId': new FormControl({ value: this._penaltyModel.characterId, disabled: true })
    });
    this.characterId.setValidators([requiredIfValues(this.penaltyType, PenaltyType.CharacterBlockage)]);
    this.accountId.setValidators([requiredIfValues(this.penaltyType, null, 0, 1, 2, 3)])
    // disable or enable character id
    this.penaltyType.valueChanges.subscribe(selectValue => {
      selectValue == PenaltyType.CharacterBlockage ? this.characterId.enable() : this.disableAndReset(this.characterId);
    });
  }

  get penaltyType(): FormControl {
    return this._addPenaltyForm.controls.penaltyType as FormControl;
  }

  get expiryDate(): FormControl {
    return this._addPenaltyForm.controls.expiryDate as FormControl;
  }

  get reason(): FormControl {
    return this._addPenaltyForm.controls.reason as FormControl;
  }

  get accountId(): FormControl {
    return this._addPenaltyForm.controls.accountId as FormControl;
  }

  get characterId(): FormControl {
    return this._addPenaltyForm.controls.characterId as FormControl;
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onSubmit() {
    if (this._addPenaltyForm.valid) {
      Object.assign(this._penaltyModel, this._addPenaltyForm.value);
      this._dialogRef.close(this._penaltyModel);
    }
  }

  loadAccountHandler(value: number): void {
    this._accountService.getById(value)
      .subscribe(data => {
        if (data == null) {
          this.accountId.setErrors([{ noAccountWithId: { value: true } }]);
        }
        this._penaltyModel.account = data
      });
  }

  loadCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => {
        this._penaltyModel.character = data
      });
  }

  disableAndReset(form: FormControl): void {
    form.disable();
    form.reset();
  }
}
