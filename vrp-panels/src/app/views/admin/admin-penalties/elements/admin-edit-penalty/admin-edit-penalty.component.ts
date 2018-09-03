import { PenaltyService } from './../../../../../service/penalty.service';
import { PenaltyType } from './../../../../../enums/PenaltyType';
import { CharacterService } from './../../../../../service/character.service';
import { AccountService } from './../../../../../service/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PenaltyModel } from './../../../../../models/PenaltyModel';
import { PENALTY_TYPES } from './../../../../../const/Names';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { requiredIfValues } from '../../../../../utils/Validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit-penalty',
  templateUrl: './admin-edit-penalty.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminEditPenaltyComponent implements OnInit {
  private _penaltyTypes = PENALTY_TYPES;
  private _editPenaltyForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AdminEditPenaltyComponent>,
    private _characterService: CharacterService,
    private _accountService: AccountService,
    private _penaltyService: PenaltyService,
    @Inject(MAT_DIALOG_DATA) public penaltyModel: PenaltyModel,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._editPenaltyForm = new FormGroup({
      'penaltyType': new FormControl({ value: this.penaltyModel.penaltyType, disabled: true }, [
        Validators.required
      ]),
      'expiryDate': new FormControl({ value: this.penaltyModel.expiryDate, disabled: true }, [
        Validators.required
      ]),
      'reason': new FormControl({ value: this.penaltyModel.reason, disabled: true }, [
        Validators.required
      ]),
      'accountId': new FormControl({ value: this.penaltyModel.accountId, disabled: true }),
      'characterId': new FormControl({ value: this.penaltyModel.characterId, disabled: true })
    });
    this.characterId.setValidators([requiredIfValues(this.penaltyType, PenaltyType.CharacterBlockage)]);
    this.accountId.setValidators([requiredIfValues(this.penaltyType, null, 0, 1, 2, 3)]);
    this.loadRelatedData();
  }

  loadRelatedData(): void {
    if (this.penaltyModel.account != null)
      this.loadAccountHandler(this.penaltyModel.accountId);
    if (this.penaltyModel.character != null)
      this.loadCharacterHandler(this.penaltyModel.characterId);
  }

  get penaltyType(): FormControl {
    return this._editPenaltyForm.controls.penaltyType as FormControl;
  }

  get expiryDate(): FormControl {
    return this._editPenaltyForm.controls.expiryDate as FormControl;
  }

  get reason(): FormControl {
    return this._editPenaltyForm.controls.reason as FormControl;
  }

  get accountId(): FormControl {
    return this._editPenaltyForm.controls.accountId as FormControl;
  }

  get characterId(): FormControl {
    return this._editPenaltyForm.controls.characterId as FormControl;
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  loadAccountHandler(value: number): void {
    this._accountService.getById(value)
      .subscribe(data => {
        if (data == null) {
          this.accountId.setErrors([{ noAccountWithId: { value: true } }]);
        }
        this.penaltyModel.account = data
      });
  }

  loadCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => {
        this.penaltyModel.character = data
      });
  }

  deactivate(): void {
    this._penaltyService.deactivate(this.penaltyModel.id).subscribe(penalty => setTimeout(() => this._toastrService.info("Pomyślnie dezaktywowano karę.")));
  }

  disableAndReset(form: FormControl): void {
    form.disable();
    form.reset();
  }
}
