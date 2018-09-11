import { Observable, merge } from 'rxjs';
import { WorkerService } from '../../../../../service/worker.service';
import { WorkerViewModel } from '../../../../../viewModels/WorkerViewModel';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { WorkerModel } from '../../../../../models/WorkerModel';
import { StaffEditMultipleWorkersComponent } from '../edition/staff-edit-multiple-workers.component';
import GroupRightsHelper from '../../../../../helpers/GroupRankHelper';
import { GroupModel } from '../../../../../models/GroupModel';

@Component({
  selector: 'app-action-bottom-sheet',
  templateUrl: './action-bottom-sheet.component.html',
  styleUrls: ['./action-bottom-sheet.component.scss']
})
export class ActionBottomSheetComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ActionBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { group: GroupModel, workerViewModels: WorkerViewModel[] },
    private _workerService: WorkerService,
    private _editWorkerDialog: MatDialog,
    private _toastrService: ToastrService,
    private _acceptSnackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  edit() {
    const dialogRef = this._editWorkerDialog.open(StaffEditMultipleWorkersComponent, {
      data: this.data,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(workers => {
      if (workers !== undefined) {
        let observables: Observable<WorkerModel>[] = workers.map(
          worker => this._workerService.put(worker.worker.id, worker.worker)
        );
        merge(...observables).subscribe();
        this._toastrService.success(`Pomyślnie edytowano dane ${workers.length} pracowników.`);
      }
      this._bottomSheetRef.dismiss();
    });
  }

  delete() {
    this._bottomSheetRef.dismiss();
    this._bottomSheetRef.afterDismissed().subscribe(data => {
      const ref = this._acceptSnackbar.open(
        `Zwolnić ${this.data.workerViewModels.length} pracownika?`,
        "Tak.",
        {
          duration: 3000
        }
      );

      ref.afterDismissed().subscribe(data => {
        if (data.dismissedByAction) {
          let observables: Observable<void>[] = this.data.workerViewModels.map(worker => this._workerService.delete(worker.worker.id));
          merge(observables).subscribe();
          this._toastrService.success(`Pomyślnie zwolniono ${observables.length} pracowników.`);
        }
      });
    });
  }
}
