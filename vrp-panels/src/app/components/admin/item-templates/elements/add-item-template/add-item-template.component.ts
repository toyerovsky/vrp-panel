import { MatDialogRef } from '@angular/material';
import { ItemTemplateModel } from './../../../../../models/ItemTemplateModel';
import { ADMIN_ITEMS_FORM } from './../../../../../const/Forms';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ITEM_TYPES } from '../../../../../const/Names';

@Component({
  selector: 'add-item-template',
  templateUrl: './add-item-template.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AddItemTemplateComponent implements OnInit {
  private _itemTypes = ITEM_TYPES;
  private _addItemForm: FormGroup;
  private _itemModel: ItemTemplateModel = new ItemTemplateModel();
  private _currentForm;

  constructor(
    private _dialogRef: MatDialogRef<AddItemTemplateComponent>
  ) {
  }

  ngOnInit() {
    this._addItemForm = new FormGroup({
      'itemType': new FormControl(this._itemModel.itemType, [
        Validators.required
      ]),
      'name': new FormControl(this._itemModel.name),
      'firstParameter': new FormControl({ value: this._itemModel.firstParameter, disabled: true }),
      'secondParameter': new FormControl({ value: this._itemModel.secondParameter, disabled: true }),
      'thirdParameter': new FormControl({ value: this._itemModel.thirdParameter, disabled: true }),
      'fourthParameter': new FormControl({ value: this._itemModel.fourthParameter, disabled: true }),
    });
    // enable/disable parameters input depending on the item type
    this.itemType.valueChanges.subscribe(selectValue => {
      // find the current form value depending on item type
      this._currentForm = ADMIN_ITEMS_FORM.find(
        item => item.itemType === this._itemTypes.find(type => type.value === selectValue).viewValue);
      // if the form doesn't exist default values are shown
      if (this._currentForm !== undefined) {
        this._currentForm.firstParamLabel ? this.firstParameter.enable() : this.disableAndReset(this.firstParameter);
        this._currentForm.secondParamLabel ? this.secondParameter.enable() : this.disableAndReset(this.secondParameter);
        this._currentForm.thirdParamLabel ? this.thirdParameter.enable() : this.disableAndReset(this.thirdParameter);
        this._currentForm.fourthParamLabel ? this.fourthParameter.enable() : this.disableAndReset(this.fourthParameter);
      }
    });
  }

  get itemType(): FormControl {
    return this._addItemForm.controls.itemType as FormControl;
  }

  get name(): FormControl {
    return this._addItemForm.controls.name as FormControl;
  }

  get characterId(): FormControl {
    return this._addItemForm.controls.characterId as FormControl;
  }

  get vehicleId(): FormControl {
    return this._addItemForm.controls.vehicleId as FormControl;
  }

  get buildingId(): FormControl {
    return this._addItemForm.controls.buildingId as FormControl;
  }

  get firstParameter(): FormControl {
    return this._addItemForm.controls.firstParameter as FormControl;
  }

  get secondParameter(): FormControl {
    return this._addItemForm.controls.secondParameter as FormControl;
  }

  get thirdParameter(): FormControl {
    return this._addItemForm.controls.thirdParameter as FormControl;
  }

  get fourthParameter(): FormControl {
    return this._addItemForm.controls.fourthParameter as FormControl;
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onSubmit() {
    if (this._addItemForm.valid) {
      Object.assign(this._itemModel, this._addItemForm.value);
      this._dialogRef.close(this._itemModel);
    }
  }

  disableAndReset(form: FormControl) {
    form.disable();
    form.reset();
  }
}
