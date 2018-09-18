import { GroupRankViewModel } from '../../../../../view-models/GroupRankViewModel';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupRight, GROUP_RIGHTS } from '../../../../../const/GroupRights';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RanksEditRankComponent } from '../ranks-edit-rank/ranks-edit-rank.component';
import { GroupModel } from '../../../../../models/GroupModel';
import GroupRightsHelper from '../../../../../helpers/GroupRankHelper';

@Component({
  selector: 'app-ranks-add-rank',
  templateUrl: './ranks-add-rank.component.html',
  styleUrls: ['./ranks-add-rank.component.scss']
})
export class RanksAddRankComponent implements OnInit {
  private _addRankForm: FormGroup;
  private _rights: GroupRight[];
  private _viewModel: GroupRankViewModel;

  constructor(
    private _dialogRef: MatDialogRef<RanksEditRankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupModel
  ) { }

  ngOnInit() {
    this._addRankForm = new FormGroup({
      'name': new FormControl('',
        [
          Validators.required
        ]),
      'salary': new FormControl(),
      'isDefault': new FormControl(),
      'rights': new FormControl()
    });
    this._rights = GROUP_RIGHTS.find(right => right.groupType == this.data.groupType).rights;
  }

  get name() {
    return this._addRankForm.controls.name as FormControl;
  }

  get salary() {
    return this._addRankForm.controls.salary as FormControl;
  }

  get isDefault() {
    return this._addRankForm.controls.isDefault as FormControl;
  }

  get rights() {
    return this._addRankForm.controls.rights as FormControl;
  }

  onSubmit() {
    if (this._addRankForm.valid) {
      Object.assign(this._viewModel.rank.name, this._addRankForm.value);
      this._viewModel.rank.rights = this.rights.value.reduce((a, b) => a + b, 0);
      this._viewModel.rights = GroupRightsHelper.rankToRights(this._viewModel.rank);
      this._dialogRef.close(this._viewModel);
    }
  }
}
