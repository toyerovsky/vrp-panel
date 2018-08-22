import { ITEM_TYPES } from '../../../../../const/Misc';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemModel } from '../../../../../models/ItemModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminAddItemComponent } from '../admin-add-item/admin-add-item.component';
import { CharacterService } from '../../../../../service/character.service';
import { ItemService } from '../../../../../service/item.service';
import { BuildingService } from '../../../../../service/building.service';
import { VehicleService } from '../../../../../service/vehicle.service';
import { characterWithIdExists, buildingWithIdExists, vehicleWithIdExists, mutuallyExclusiveWith } from '../../../../../utils/Validators';

@Component({
  selector: 'app-admin-edit-item',
  templateUrl: './admin-edit-item.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminEditItemComponent implements OnInit {
  private _itemTypes = ITEM_TYPES;
  private _editItemForm: FormGroup;

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
      'characterId': new FormControl(this.itemModel.characterId, {
        asyncValidators: [
          characterWithIdExists(this._characterService)
        ],
        updateOn: 'blur'
      }),
      'buildingId': new FormControl(this.itemModel.buildingId, {
        asyncValidators: [
          buildingWithIdExists(this._buildingService)
        ],
        updateOn: 'blur'
      }),
      'vehicleId': new FormControl(this.itemModel.vehicleId, {
        asyncValidators: [
          vehicleWithIdExists(this._vehicleService)
        ],
        updateOn: 'blur'
      })
    });
    this.characterId.setValidators([mutuallyExclusiveWith(this.buildingId, this.vehicleId)]);
    this.buildingId.setValidators([mutuallyExclusiveWith(this.characterId, this.vehicleId)]);
    this.vehicleId.setValidators([mutuallyExclusiveWith(this.characterId, this.buildingId)])
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