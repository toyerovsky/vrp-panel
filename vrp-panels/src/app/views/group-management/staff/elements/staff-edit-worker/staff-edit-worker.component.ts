import { GroupRankModel } from './../../../../../models/GroupRankModel';
import { Observable } from 'rxjs';
import { GroupRankService } from './../../../../../service/group-rank.service';
import { WorkerModel } from './../../../../../models/WorkerModel';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-staff-edit-worker',
  templateUrl: './staff-edit-worker.component.html',
  styleUrls: ['./staff-edit-worker.component.scss']
})
export class StaffEditWorkerComponent implements OnInit {
  private _editWorkerForm: FormGroup;
  private _ranks: Observable<GroupRankModel[]>;

  constructor(
    private _dialogRef: MatDialogRef<StaffEditWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public workerModel: any,
    private _groupRankService: GroupRankService,
  ) {
    this._ranks = _groupRankService.getAllByGroupId(workerModel.groupId);
  }

  ngOnInit() {
    if (this.workerModel instanceof WorkerModel) { // one worker
      this._editWorkerForm = new FormGroup({
        'name': new FormControl({
          value: `${this.workerModel.character.name} ${this.workerModel.character.surname}`,
          disabled: true
        }),
        'salary': new FormControl(this.workerModel.salary),
        'groupRank': new FormControl(this.workerModel.groupRank),
        'customRights': new FormControl(this.workerModel.rights)
      });
    } else { // multiple workers
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
