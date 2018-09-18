import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../../../service/character.service';
import { noCharacterWithId } from '../../../../../utils/Validator';
import { GroupModel } from '../../../../../models/GroupModel';
import { GROUP_TYPES } from '../../../../../const/Names';

@Component({
  selector: 'admin-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class EditGroupComponent implements OnInit {
  private _editGroupForm: FormGroup;
  private _groupTypes = GROUP_TYPES;

  constructor(
    private _dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public groupModel: GroupModel,
    private _characterService: CharacterService,
  ) {
  }

  ngOnInit() {
    this._editGroupForm = new FormGroup({
      'groupType': new FormControl(
        GROUP_TYPES.find(type => type.viewValue == this.groupModel.groupType).value,
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
      'grant': new FormControl(this.groupModel.grant),
      'maxPayday': new FormControl(this.groupModel.maxPayday),
      'bossCharacterId': new FormControl(this.groupModel.bossCharacterId, [
        Validators.required
      ], [
          noCharacterWithId(this._characterService)
        ]),
      'color': new FormControl(this.groupModel.color, [
        Validators.pattern(new RegExp('[0-9a-f]{3,6}', 'i')) // hex color
      ])
    });
    this.loadBossCharacterHandler(this.groupModel.bossCharacterId);
  }

  get groupType(): FormControl {
    return this._editGroupForm.controls.groupType as FormControl;
  }

  get name(): FormControl {
    return this._editGroupForm.controls.name as FormControl;
  }

  get tag(): FormControl {
    return this._editGroupForm.controls.tag as FormControl;
  }

  get grant(): FormControl {
    return this._editGroupForm.controls.grant as FormControl;
  }

  get maxPayday(): FormControl {
    return this._editGroupForm.controls.maxPayday as FormControl;
  }

  get color(): FormControl {
    return this._editGroupForm.controls.color as FormControl;
  }

  get bossCharacterId(): FormControl {
    return this._editGroupForm.controls.bossCharacterId as FormControl;
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onSubmit() {
    if (this._editGroupForm.valid) {
      Object.assign(this.groupModel, this._editGroupForm.value);
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
