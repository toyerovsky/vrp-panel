import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../../../service/character.service';
import { noCharacterWithId } from '../../../../../utils/Validator';
import { GroupModel } from '../../../../../models/GroupModel';
import { GROUP_TYPES } from '../../../../../const/Names';

@Component({
  selector: 'app-admin-edit-group',
  templateUrl: './admin-edit-group.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminEditGroupComponent implements OnInit {
  private _addGroupForm: FormGroup;
  private _groupTypes = GROUP_TYPES;

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
          noCharacterWithId(this._characterService)
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