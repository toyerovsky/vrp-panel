import { GroupRankViewModel } from './../../../../../viewModels/GroupRankViewModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupRankService } from './../../../../../service/group-rank.service';
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

  constructor(
    private _dialogRef: MatDialogRef<RanksEditRankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { group: GroupModel, viewModel: GroupRankViewModel }
  ) { }

  ngOnInit() {
    this._editRankForm = new FormGroup({
      'name': new FormControl(this.data.viewModel.rank.name, [
        Validators.required
      ]),
      'salary': new FormControl({
        value: this.data.viewModel.rank.salary
      }),
      'isDefault': new FormControl({
        value:
          this.data.group.defaultRankId == this.data.viewModel.rank.id
      }),
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
}
