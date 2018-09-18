import { GroupRight, GROUP_RIGHTS } from './../../../../../const/GroupRights';
import { GroupRankViewModel } from '../../../../../view-models/GroupRankViewModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import GroupRightsHelper from '../../../../../helpers/GroupRankHelper';
import { GroupModel } from '../../../../../models/GroupModel';

@Component({
  selector: 'app-ranks-edit-rank',
  templateUrl: './ranks-edit-rank.component.html',
  styleUrls: ['./ranks-edit-rank.component.scss']
})
export class RanksEditRankComponent implements OnInit {
  private _editRankForm: FormGroup;
  private _rights: GroupRight[];

  constructor(
    private _dialogRef: MatDialogRef<RanksEditRankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { group: GroupModel, viewModel: GroupRankViewModel }
  ) { }

  ngOnInit() {
    this._rights = GROUP_RIGHTS.find(right => right.groupType == this.data.group.groupType).rights;
    this._editRankForm = new FormGroup({
      'name': new FormControl(this.data.viewModel.rank.name, [
        Validators.required
      ]),
      'salary': new FormControl(
        this.data.viewModel.rank.salary
      ),
      'isDefault': new FormControl(
        this.data.group.defaultRankId == this.data.viewModel.rank.id
      ),
      'rights': new FormControl(GroupRightsHelper.rightsToArray(this.data.viewModel.rights))
    });
  }

  get name() {
    return this._editRankForm.controls.name as FormControl;
  }

  get salary() {
    return this._editRankForm.controls.salary as FormControl;
  }

  get isDefault() {
    return this._editRankForm.controls.isDefault as FormControl;
  }

  get rights() {
    return this._editRankForm.controls.rights as FormControl;
  }

  onSubmit() {
    if (this._editRankForm.valid) {
      Object.assign(this.data.viewModel.rank, this._editRankForm.value);
      this.data.viewModel.rank.rights = this.rights.value.reduce((a, b) => a + b, 0);
      this.data.viewModel.rights = GroupRightsHelper.rankToRights(this.data.viewModel.rank);
      this._dialogRef.close(this.data.viewModel);
    }
  }
}
