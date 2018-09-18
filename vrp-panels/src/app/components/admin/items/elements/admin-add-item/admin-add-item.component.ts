import { FormControl } from '@angular/forms';
import { VehicleService } from '../../../../../service/vehicle.service';
import { BuildingService } from '../../../../../service/building.service';
import { ItemService } from '../../../../../service/item.service';
import { CharacterService } from '../../../../../service/character.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, Validators } from '@angular/forms';
import { ItemModel } from '../../../../../models/ItemModel';
import { Component, OnInit } from '@angular/core';
import { mutuallyExclusiveWith, noCharacterWithId, noBuildingWithId, noVehicleWithId } from '../../../../../utils/Validator';
import { ITEM_TYPES } from '../../../../../const/Names';
import { ADMIN_ITEMS_FORM } from '../../../../../const/Forms';

@Component({
  selector: 'admin-add-item',
  templateUrl: './admin-add-item.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminAddItemComponent implements OnInit {
  private _itemTypes = ITEM_TYPES;
  private _addItemForm: FormGroup;
  private _itemModel: ItemModel = new ItemModel();
  private _currentForm;

  constructor(
    private _dialogRef: MatDialogRef<AdminAddItemComponent>,
    private _characterService: CharacterService,
    private _itemService: ItemService,
    private _buildingService: BuildingService,
    private _vehicleService: VehicleService
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
      'characterId': new FormControl(this._itemModel.characterId, {
        asyncValidators: [
          noCharacterWithId(this._characterService)
        ],
        updateOn: 'blur'
      }),
      'buildingId': new FormControl(this._itemModel.buildingId, {
        asyncValidators: [
          noBuildingWithId(this._buildingService)
        ],
        updateOn: 'blur'
      }),
      'vehicleId': new FormControl(this._itemModel.vehicleId, {
        asyncValidators: [
          noVehicleWithId(this._vehicleService)
        ],
        updateOn: 'blur'
      })
    });
    this.characterId.setValidators([mutuallyExclusiveWith(this.buildingId, this.vehicleId)]);
    this.buildingId.setValidators([mutuallyExclusiveWith(this.characterId, this.vehicleId)]);
    this.vehicleId.setValidators([mutuallyExclusiveWith(this.characterId, this.buildingId)])
    // enable/disable parameters input depending on the item type
    this.itemType.valueChanges.subscribe(selectValue => {
      this._currentForm = ADMIN_ITEMS_FORM.find(
        item => item.itemType === this._itemTypes.find(type => type.value === selectValue).viewValue);
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

  loadCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => {
        this._itemModel.character = data;
      });
  }

  loadBuildingHandler(value: number): void {
    this._buildingService.getById(value)
      .subscribe(data => {
        this._itemModel.building = data;
      });
  }

  loadVehicleHandler(value: number): void {
    this._vehicleService.getById(value)
      .subscribe(data => {
        this._itemModel.vehicle = data;
      });
  }

  disableAndReset(form: FormControl) {
    form.disable();
    form.reset();
  }
}
