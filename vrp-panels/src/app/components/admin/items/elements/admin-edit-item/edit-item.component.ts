import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemModel } from '../../../../../models/ItemModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminAddItemComponent } from '../admin-add-item/admin-add-item.component';
import { CharacterService } from '../../../../../service/character.service';
import { ItemService } from '../../../../../service/item.service';
import { BuildingService } from '../../../../../service/building.service';
import { VehicleService } from '../../../../../service/vehicle.service';
import { noCharacterWithId, noBuildingWithId, noVehicleWithId, mutuallyExclusiveWith } from '../../../../../utils/Validator';
import { ITEM_TYPES } from '../../../../../const/Names';
import { ADMIN_ITEMS_FORM } from '../../../../../const/Forms';

@Component({
  selector: 'admin-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class EditItemComponent implements OnInit {
  private _itemTypes = ITEM_TYPES;
  private _editItemForm: FormGroup;
  private _currentForm;

  constructor(
    private _dialogRef: MatDialogRef<AdminAddItemComponent>,
    private _characterService: CharacterService,
    private _itemService: ItemService,
    private _buildingService: BuildingService,
    private _vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public itemModel: ItemModel
  ) {
  }

  ngOnInit() {
    this._editItemForm = new FormGroup({
      'itemType': new FormControl(this.itemModel.itemType, [
        Validators.required
      ]),
      'name': new FormControl(this.itemModel.name),
      'firstParameter': new FormControl({ value: this.itemModel.firstParameter, disabled: true }),
      'secondParameter': new FormControl({ value: this.itemModel.secondParameter, disabled: true }),
      'thirdParameter': new FormControl({ value: this.itemModel.thirdParameter, disabled: true }),
      'fourthParameter': new FormControl({ value: this.itemModel.fourthParameter, disabled: true }),
      'characterId': new FormControl(this.itemModel.characterId, {
        asyncValidators: [
          noCharacterWithId(this._characterService)
        ],
        updateOn: 'blur'
      }),
      'buildingId': new FormControl(this.itemModel.buildingId, {
        asyncValidators: [
          noBuildingWithId(this._buildingService)
        ],
        updateOn: 'blur'
      }),
      'vehicleId': new FormControl(this.itemModel.vehicleId, {
        asyncValidators: [
          noVehicleWithId(this._vehicleService)
        ],
        updateOn: 'blur'
      })
    });
    this.characterId.setValidators([mutuallyExclusiveWith(this.buildingId, this.vehicleId)]);
    this.buildingId.setValidators([mutuallyExclusiveWith(this.characterId, this.vehicleId)]);
    this.vehicleId.setValidators([mutuallyExclusiveWith(this.characterId, this.buildingId)])
    this.itemType.valueChanges.subscribe(selectValue => {
      this._currentForm = ADMIN_ITEMS_FORM.find(item => item.itemType == this._itemTypes.find(item => item.value == selectValue).viewValue);
      if (this._currentForm != undefined) {
        this._currentForm.firstParamLabel ? this.firstParameter.enable() : this.firstParameter.disable();
        this._currentForm.secondParamLabel ? this.secondParameter.enable() : this.secondParameter.disable();
        this._currentForm.thirdParamLabel ? this.thirdParameter.enable() : this.thirdParameter.disable();
        this._currentForm.fourthParamLabel ? this.fourthParameter.enable() : this.fourthParameter.disable();
      }
    })
  }

  get itemType(): FormControl {
    return this._editItemForm.controls.itemType as FormControl;
  }

  get name(): FormControl {
    return this._editItemForm.controls.name as FormControl;
  }

  get characterId(): FormControl {
    return this._editItemForm.controls.characterId as FormControl;
  }

  get vehicleId(): FormControl {
    return this._editItemForm.controls.vehicleId as FormControl;
  }

  get buildingId(): FormControl {
    return this._editItemForm.controls.buildingId as FormControl;
  }

  get firstParameter(): FormControl {
    return this._editItemForm.controls.firstParameter as FormControl;
  }

  get secondParameter(): FormControl {
    return this._editItemForm.controls.secondParameter as FormControl;
  }

  get thirdParameter(): FormControl {
    return this._editItemForm.controls.thirdParameter as FormControl;
  }

  get fourthParameter(): FormControl {
    return this._editItemForm.controls.fourthParameter as FormControl;
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onSubmit() {
    if (this._editItemForm.valid) {
      Object.assign(this.itemModel, this._editItemForm.value);
      this._dialogRef.close(this.itemModel);
    }
  }

  loadCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => {
        this.itemModel.character = data
      });
  }

  loadBuildingHandler(value: number): void {
    this._buildingService.getById(value)
      .subscribe(data => {
        this.itemModel.building = data
      });
  }

  loadVehicleHandler(value: number): void {
    this._vehicleService.getById(value)
      .subscribe(data => {
        this.itemModel.vehicle = data
      });
  }
}
