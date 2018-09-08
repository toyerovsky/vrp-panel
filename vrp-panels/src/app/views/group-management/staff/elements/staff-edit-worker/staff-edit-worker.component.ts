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

  constructor(
    private _dialogRef: MatDialogRef<StaffEditWorkerComponent>,
    @Inject(MAT_DIALOG_DATA) public workerModel: WorkerModel
  ) { }

  ngOnInit() {
    this._editWorkerForm = new FormGroup({
      'name': new FormControl({
        value: `${this.workerModel.character.name} ${this.workerModel.character.surname}`,
        disabled: true
      }),
      'salary': new FormControl(this.workerModel.salary),
      'groupRank': new FormControl(this.workerModel.groupRank),
      'rights': new FormControl(this.workerModel.rights)
    });
  }

}
