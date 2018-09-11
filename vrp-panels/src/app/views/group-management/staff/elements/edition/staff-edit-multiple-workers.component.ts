import { WorkerViewModel } from './../../../../../viewModels/WorkerViewModel';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GroupRankModel } from '../../../../../models/GroupRankModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffEditWorkerComponent } from './staff-edit-worker.component';
import { WorkerModel } from '../../../../../models/WorkerModel';
import { GroupRankService } from '../../../../../service/group-rank.service';
import { GROUP_RIGHTS, GroupRight } from '../../../../../const/GroupRights';
import { GroupModel } from '../../../../../models/GroupModel';
import GroupRightsHelper from '../../../../../helpers/GroupRankHelper';

@Component({
  selector: 'app-staff-edit-multiple-workers',
  templateUrl: './staff-edit-worker.component.html',
  styleUrls: ['./staff-edit-worker.component.scss']
})
export class StaffEditMultipleWorkersComponent implements OnInit {
  private _editWorkerForm: FormGroup;
  private _ranks: Observable<GroupRankModel[]>;
  private _rights: GroupRight[];
  private _group: GroupModel;

  constructor(
    private _dialogRef: MatDialogRef<StaffEditWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { group: GroupModel, workerViewModels: WorkerViewModel[] },
    private _groupRankService: GroupRankService,
  ) {
    this._group = this.data.group;
    this._ranks = _groupRankService.getAllByGroupId(this._group.id);
  }

  ngOnInit() {
    this._editWorkerForm = new FormGroup({
      'name': new FormControl({
        value:
          this.data.workerViewModels.map(worker => `${worker.worker.character.name} ${worker.worker.character.surname}`).join(', '),
        disabled: true
      }),
      'salary': new FormControl(),
      'groupRankId': new FormControl(this._group.defaultRankId),
      'rights': new FormControl([])
    });
    this._rights = GROUP_RIGHTS.find(right => right.groupType == this._group.groupType).rights;
  }

  get name() {
    return this._editWorkerForm.controls.name as FormControl;
  }

  get salary() {
    return this._editWorkerForm.controls.salary as FormControl;
  }

  get groupRankId() {
    return this._editWorkerForm.controls.groupRankId as FormControl;
  }

  get rights() {
    return this._editWorkerForm.controls.rights as FormControl;
  }

  onSubmit() {
    if (this._editWorkerForm.valid) {
      this.data.workerViewModels.forEach(viewModel => {
        if (this.groupRankId.touched || this.groupRankId.dirty)
          viewModel.worker.groupRankId = this._editWorkerForm.value.groupRankId;
        if (this.salary.dirty)
          viewModel.worker.salary = this._editWorkerForm.value.salary;
        if (this.rights.dirty) {
          viewModel.worker.rights = this._editWorkerForm.value.rights.reduce((a, b) => a + b, 0);
          viewModel.rights = GroupRightsHelper.workerToRights(viewModel.worker);
        }
      });

      this._dialogRef.close(this.data.workerViewModels);
    }
  }
}
