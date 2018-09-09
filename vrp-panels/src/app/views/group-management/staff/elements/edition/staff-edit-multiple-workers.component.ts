import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GroupRankModel } from '../../../../../models/GroupRankModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffEditWorkerComponent } from './staff-edit-worker.component';
import { WorkerModel } from '../../../../../models/WorkerModel';
import { GroupRankService } from '../../../../../service/group-rank.service';

@Component({
  selector: 'app-staff-edit-multiple-workers',
  templateUrl: './staff-edit-worker.component.html',
  styleUrls: ['./staff-edit-worker.component.scss']
})
export class StaffEditMultipleWorkersComponent implements OnInit {
  private _editWorkerForm: FormGroup;
  private _ranks: Observable<GroupRankModel[]>;

  constructor(
    private _dialogRef: MatDialogRef<StaffEditWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public workerModel: WorkerModel[],
    private _groupRankService: GroupRankService,
  ) {
    this._ranks = _groupRankService.getAllByGroupId(workerModel[0].groupId);
  }

  ngOnInit() {
    this._editWorkerForm = new FormGroup({
      'name': new FormControl({
        value:
          this.workerModel.map(worker => `${worker.character.name} ${worker.character.surname}`).join(', '),
        disabled: true
      }),
      'salary': new FormControl(),
      'groupRankId': new FormControl(),
      'rights': new FormControl()
    });
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
      this._dialogRef.close(this._editWorkerForm.value);
    }
  }
}
