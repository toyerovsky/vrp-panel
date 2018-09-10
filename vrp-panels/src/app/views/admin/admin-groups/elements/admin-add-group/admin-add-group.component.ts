import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../../../service/character.service';
import { noCharacterWithId } from '../../../../../utils/Validator';
import { GroupModel } from '../../../../../models/GroupModel';
import { GROUP_TYPES } from '../../../../../const/Names';

@Component({
  selector: 'app-admin-add-group',
  templateUrl: './admin-add-group.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminAddGroupComponent implements OnInit {
  private _groupTypes = GROUP_TYPES;
  private _addGroupForm: FormGroup;
  private _groupModel: GroupModel = new GroupModel();

  constructor(
    private _dialogRef: MatDialogRef<AdminAddGroupComponent>,
    private _characterService: CharacterService,
  ) {
  }

  ngOnInit() {
    this._addGroupForm = new FormGroup({
      'groupType': new FormControl(this._groupModel.groupType,
        [
          Validators.required
        ]),
      'name': new FormControl(this._groupModel.name,
        [
          Validators.required
        ]),
      'tag': new FormControl(this._groupModel.tag, [
        Validators.required
      ]),
      'grant': new FormControl(this._groupModel.grant),
      'maxPayday': new FormControl(this._groupModel.maxPayday),
      'bossCharacterId': new FormControl(this._groupModel.bossCharacterId, [
        Validators.required
      ], [
        noCharacterWithId(this._characterService)
      ]),
      'color': new FormControl(this._groupModel.color, [
        Validators.pattern(new RegExp('[0-9a-f]{3,6}', 'i')) // hex color
      ])
    });
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

  get grant(): FormControl {
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
      Object.assign(this._groupModel, this._addGroupForm.value);
      this._dialogRef.close(this._groupModel);
    }
    console.log(this.color.errors)
  }

  loadBossCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => {
        this._groupModel.bossCharacter = data
      });
  }
}