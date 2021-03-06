import { GroupRight, GROUP_RIGHTS } from '../../../../../const/GroupRights';
import { WorkerViewModel } from '../../../../../view-models/WorkerViewModel';
import { GroupRankModel } from '../../../../../models/GroupRankModel';
import { Observable } from 'rxjs';
import { GroupRankService } from '../../../../../service/group-rank.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import GroupRightsHelper from '../../../../../helpers/GroupRankHelper';

@Component({
  selector: 'staff-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.scss']
})
export class EditWorkerComponent implements OnInit {
  private _editWorkerForm: FormGroup;
  private _ranks: Observable<GroupRankModel[]>;
  private _rights: GroupRight[];

  constructor(
    private _dialogRef: MatDialogRef<EditWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public viewModel: WorkerViewModel,
    private _groupRankService: GroupRankService,
  ) {
    this._ranks = _groupRankService.getAllByGroupId(viewModel.worker.groupId);
  }

  ngOnInit() {
    this._editWorkerForm = new FormGroup({
      'name': new FormControl({
        value: `${this.viewModel.worker.character.name} ${this.viewModel.worker.character.surname}`,
        disabled: true
      }),
      'salary': new FormControl(this.viewModel.worker.salary),
      'groupRankId': new FormControl(this.viewModel.worker.groupRank),
      'rights': new FormControl(
        GroupRightsHelper.rightsToArray(
          GroupRightsHelper.workerToRights(this.viewModel.worker)
        ))
    });
    this._rights = GROUP_RIGHTS.find(right => right.groupType === this.viewModel.worker.group.groupType).rights;
  }

  get name() {
    return this._editWorkerForm.controls.name as FormControl;
  }

  get salary() {
    return this._editWorkerForm.controls.salary as FormControl;
  }

  get groupRankId() {
    return this._editWorkerForm.controls.groupRank as FormControl;
  }

  get rights() {
    return this._editWorkerForm.controls.rights as FormControl;
  }

  onSubmit() {
    if (this._editWorkerForm.valid) {
      this.viewModel.worker.groupRankId = this._editWorkerForm.value.groupRankId.id;
      this.viewModel.worker.salary = this._editWorkerForm.value.salary;
      this.viewModel.worker.rights = this._editWorkerForm.value.rights.reduce((a, b) => a + b, 0);
      this.viewModel.rights = GroupRightsHelper.workerToRightsIncludeRankRights(this.viewModel.worker);
      this._dialogRef.close(this.viewModel);
    }
  }
}
