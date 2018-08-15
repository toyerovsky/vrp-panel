import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatAutocomplete, MAT_DIALOG_DATA } from '@angular/material';
import { VehicleModel } from '../../../../../models/VehicleModel';
import { FormControl, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map, max } from 'rxjs/operators';
import { VEHICLES, GROUP_TYPES } from '../../../../../const/Misc';
import { CharacterService } from '../../../../../service/character.service';
import { GroupService } from '../../../../../service/group.service';
import { isVehicleName, mutuallyExclusiveWith, isNumberPlateTaken, characterWithIdExists } from '../../../../../utils/validators';
import { GroupModel } from '../../../../../models/GroupModel';

@Component({
  selector: 'app-admin-edit-group',
  templateUrl: './admin-edit-group.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminEditGroupComponent implements OnInit {
  private _groupTypes = GROUP_TYPES;
  private _addGroupForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AdminEditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public groupModel: GroupModel,
    private _characterService: CharacterService,
  ) {
  }

  ngOnInit() {
    this._addGroupForm = new FormGroup({
      'groupType': new FormControl(this.groupModel.groupType,
        [
          Validators.required
        ]),
      'name': new FormControl(this.groupModel.name,
        [
          Validators.required
        ]),
      'tag': new FormControl(this.groupModel.tag, [
        Validators.required
      ]),
      'dotation': new FormControl(this.groupModel.dotation),
      'maxPayday': new FormControl(this.groupModel.maxPayday),
      'bossCharacterId': new FormControl(this.groupModel.bossId, [
        Validators.required
      ], [
          characterWithIdExists(this._characterService)
        ]),
      'color': new FormControl(this.groupModel.maxPayday, [
        Validators.pattern('/[0-9A-Fa-f]{6}/g') // hex color
      ])
    });
    this.loadBossCharacterHandler(this.groupModel.bossId)
  }

  get groupType(): FormControl {
    return this._addGroupForm.controls.groupType as FormControl;
  }

  get name(): FormControl {
    return this._addGroupForm.controls.name as FormControl;
  }

  get tag(): FormControl {
    return this._addGroupForm.controls.tag as FormControl;
  }

  get dotation(): FormControl {
    return this._addGroupForm.controls.dotation as FormControl;
  }

  get maxPayday(): FormControl {
    return this._addGroupForm.controls.maxPayday as FormControl;
  }

  get color(): FormControl {
    return this._addGroupForm.controls.color as FormControl;
  }

  get bossCharacterId(): FormControl {
    return this._addGroupForm.controls.bossCharacterId as FormControl;
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onSubmit() {
    if (this._addGroupForm.valid) {
      Object.assign(this.groupModel, this._addGroupForm.value);
      this._dialogRef.close(this.groupModel);
    }
  }

  loadBossCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => {
        this.groupModel.bossCharacter = data
      });
  }
}