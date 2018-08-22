import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BuildingModel } from '../../../../../models/BuildingModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../../../service/character.service';
import { GroupService } from '../../../../../service/group.service';
import { mutuallyExclusiveWith, characterWithIdExists, groupWithIdExists } from '../../../../../utils/Validator';

@Component({
  selector: 'app-admin-edit-building',
  templateUrl: './admin-edit-building.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminEditBuildingComponent implements OnInit {
  private _editBuildingForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AdminEditBuildingComponent>,
    private _characterService: CharacterService,
    private _groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public buildingModel: BuildingModel
  ) {
  }

  ngOnInit() {
    this._editBuildingForm = new FormGroup({
      'name': new FormControl(this.buildingModel.name, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'description': new FormControl(this.buildingModel.description),
      'spawnPossible': new FormControl(this.buildingModel.spawnPossible, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'characterId': new FormControl(this.buildingModel.characterId, {
        asyncValidators: [
          characterWithIdExists(this._characterService)
        ],
        updateOn: 'blur'
      }),
      'groupId': new FormControl(this.buildingModel.groupId, {
        asyncValidators: [
          groupWithIdExists(this._groupService)
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionX': new FormControl(this.buildingModel.externalPickupPositionX, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionY': new FormControl(this.buildingModel.externalPickupPositionY, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionZ': new FormControl(this.buildingModel.externalPickupPositionZ, {
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
    return this._editBuildingForm.controls.description as FormControl;
  }

  get name(): FormControl {
    return this._editBuildingForm.controls.name as FormControl;
  }

  get spawnPossible(): FormControl {
    return this._editBuildingForm.controls.spawnPossible as FormControl;
  }

  get characterId(): FormControl {
    return this._editBuildingForm.controls.characterId as FormControl;
  }

  get groupId(): FormControl {
    return this._editBuildingForm.controls.groupId as FormControl;
  }

  get externalPickupPositionX(): FormControl {
    return this._editBuildingForm.controls.externalPickupPositionX as FormControl;
  }

  get externalPickupPositionY(): FormControl {
    return this._editBuildingForm.controls.externalPickupPositionY as FormControl;
  }

  get externalPickupPositionZ(): FormControl {
    return this._editBuildingForm.controls.externalPickupPositionZ as FormControl;
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onSubmit() {
    if (this._editBuildingForm.valid) {
      Object.assign(this.buildingModel, this._editBuildingForm.value);
      this._dialogRef.close(this.buildingModel);
    }
  }

  loadCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => this.buildingModel.character = data);
  }

  loadGroupHandler(value: number): void {
    this._groupService.getById(value)
      .subscribe(data => this.buildingModel.group = data);
  }
}