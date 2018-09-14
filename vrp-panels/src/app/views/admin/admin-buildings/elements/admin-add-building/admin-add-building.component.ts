import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BuildingModel } from '../../../../../models/BuildingModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../../../service/character.service';
import { GroupService } from '../../../../../service/group.service';
import { mutuallyExclusiveWith, noCharacterWithId, noGroupWithId } from '../../../../../utils/Validator';

@Component({
  selector: 'app-admin-add-building',
  templateUrl: './admin-add-building.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminAddBuildingComponent implements OnInit {
  private _addBuildingForm: FormGroup;
  private _buildingModel: BuildingModel = new BuildingModel();

  constructor(
    private _dialogRef: MatDialogRef<AdminAddBuildingComponent>,
    private _characterService: CharacterService,
    private _groupService: GroupService
  ) {
  }

  ngOnInit() {
    this._addBuildingForm = new FormGroup({
      'name': new FormControl(this._buildingModel.name, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'description': new FormControl(this._buildingModel.description),
      'spawnPossible': new FormControl(this._buildingModel.spawnPossible),
      'characterId': new FormControl(this._buildingModel.characterId, {
        asyncValidators: [
          noCharacterWithId(this._characterService)
        ],
        updateOn: 'blur'
      }),
      'groupId': new FormControl(this._buildingModel.groupId, {
        asyncValidators: [
          noGroupWithId(this._groupService)
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionX': new FormControl(this._buildingModel.externalPickupPositionX, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionY': new FormControl(this._buildingModel.externalPickupPositionY, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionZ': new FormControl(this._buildingModel.externalPickupPositionZ, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
    });
    this.characterId.setValidators([mutuallyExclusiveWith(this.groupId)]);
    this.groupId.setValidators([mutuallyExclusiveWith(this.characterId)]);
  }

  get description(): FormControl {
    return this._addBuildingForm.controls.description as FormControl;
  }

  get name(): FormControl {
    return this._addBuildingForm.controls.name as FormControl;
  }

  get spawnPossible(): FormControl {
    return this._addBuildingForm.controls.spawnPossible as FormControl;
  }

  get characterId(): FormControl {
    return this._addBuildingForm.controls.characterId as FormControl;
  }

  get groupId(): FormControl {
    return this._addBuildingForm.controls.groupId as FormControl;
  }

  get externalPickupPositionX(): FormControl {
    return this._addBuildingForm.controls.externalPickupPositionX as FormControl;
  }

  get externalPickupPositionY(): FormControl {
    return this._addBuildingForm.controls.externalPickupPositionY as FormControl;
  }

  get externalPickupPositionZ(): FormControl {
    return this._addBuildingForm.controls.externalPickupPositionZ as FormControl;
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onSubmit() {
    if (this._addBuildingForm.valid) {
      Object.assign(this._buildingModel, this._addBuildingForm.value);
      this._dialogRef.close(this._buildingModel);
    }
  }

  loadCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => this._buildingModel.character = data);
  }

  loadGroupHandler(value: number): void {
    this._groupService.getById(value)
      .subscribe(data => this._buildingModel.group = data);
  }
}