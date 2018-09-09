import { Observable, merge, Subscription } from 'rxjs';
import { StaffEditWorkerComponent } from './../staff-edit-worker/staff-edit-worker.component';
import { WorkerService } from '../../../../../service/worker.service';
import { WorkerViewModel } from '../../../../../viewModels/WorkerViewModel';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { WorkerModel } from '../../../../../models/WorkerModel';

@Component({
  selector: 'app-action-bottom-sheet',
  templateUrl: './action-bottom-sheet.component.html',
  styleUrls: ['./action-bottom-sheet.component.scss']
})
export class ActionBottomSheetComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ActionBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: WorkerViewModel[],
    private _workerService: WorkerService,
    private _editWorkerDialog: MatDialog,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
  }

  edit() {
    const dialogRef = this._editWorkerDialog.open(StaffEditWorkerComponent, {
      data: this.data,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(formResult => {
      if (formResult !== undefined) {
        this.data.forEach(viewModel => {
          viewModel.worker.groupRankId = formResult.groupRankId,
          viewModel.worker.salary = formResult.salary,
          viewModel.worker.rights = formResult.rights.reduce((a, b) => a + b, 0)
        });

        let observables: Observable<WorkerModel>[] = this.data.map(
          worker => this._workerService.put(worker.worker.id, worker.worker)
        );
        merge(observables).subscribe();
        this._toastrService.success(`Pomyślnie edytowano dane ${observables.length} pracowników.`);
      }
      this._bottomSheetRef.dismiss('refresh');
    });
  }

  delete() {
    let observables: Observable<void>[] = this.data.map(worker => this._workerService.delete(worker.worker.id));
    merge(observables).subscribe();
    this._toastrService.success(`Pomyślnie zwolniono ${observables.length} pracowników.`);
    this._bottomSheetRef.dismiss('refresh');
  }
}
