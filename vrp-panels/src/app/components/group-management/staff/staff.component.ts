import { EditWorkerComponent } from './elements/edition/edit-worker.component';
import { WorkerService } from '../../../service/worker.service';
import { WorkerViewModel } from '../../../view-models/WorkerViewModel';
import { GroupRight, GROUP_RIGHTS } from '../../../const/GroupRights';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GroupModel } from '../../../models/GroupModel';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../service/group.service';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatBottomSheet, MatDialog } from '@angular/material';
import GroupRightsHelper from '../../../helpers/GroupRankHelper';
import { ActionBottomSheetComponent } from './elements/action-bottom-sheet/action-bottom-sheet.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  /**
   * Group to display
   */
  private _group: GroupModel;
  /**
   * Routing parameter
   */
  private _groupId: number;

  private _bottomSheetOpened: boolean;
  private _dataReady: boolean;

  private _displayedColumns: string[] =
    ['select', 'name', 'duty', 'rank', 'salary', 'depositWithdrawMoney', 'recruitment', 'orders', 'doors', 'chat', 'offers', 'panel'];
  private _dataSource = new MatTableDataSource<WorkerViewModel>();
  private _selection = new SelectionModel<WorkerViewModel>(true, []);
  private _rights: GroupRight[];

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _route: ActivatedRoute,
    private _groupService: GroupService,
    private _toastr: ToastrService,
    private _bottomSheet: MatBottomSheet,
    private _workerService: WorkerService,
    private _editWorkerDialog: MatDialog) {
  }

  ngOnInit() {
    this._selection.onChange.subscribe(() => {
      if (this.isAnythingSelected() && !this._bottomSheetOpened) {
        this.openBottomSheet();
      } else if (!this.isAnythingSelected()) {
        this._bottomSheet.dismiss();
      }
    });

    this._route.parent.paramMap.subscribe(params => {
      this._groupId = +params.get('id');
      this._dataReady = false;
      this._groupService.getById(this._groupId).subscribe(group => {
        if (group !== undefined) {
          this._group = group;
          this._rights = GROUP_RIGHTS.find(right => right.groupType === this._group.groupType).rights;
          this._dataSource.data = group.workers.map(worker => {
            return {
              worker: worker,
              rights: GroupRightsHelper.workerToRightsIncludeRankRights(worker)
            };
          });
        } else {
          this._toastr.error(`Nie odnaleziono grupy o id ${this._groupId}.`);
        }
        this._dataReady = true;
      });
    });
  }

  ngOnDestroy() {
    this._bottomSheet.dismiss();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this._selection.selected.length;
    const numRows = this._dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this._selection.clear();
      this._bottomSheet.dismiss();
    } else {
      this._dataSource.data.forEach(row => this._selection.select(row));
    }
  }

  isAnythingSelected() {
    return this._selection.selected.length !== 0;
  }

  openBottomSheet() {
    this._bottomSheet.open(ActionBottomSheetComponent, {
      data: {
        group: this._group,
        workerViewModels: this._selection.selected
      },
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'bottom-sheet-container-small',
    });

    this._bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(data => {
      this._selection.clear();
      this._bottomSheetOpened = false;
    });

    this._bottomSheetOpened = true;
  }

  masterChangeHandler() {
    this.masterToggle();
    if (!this._bottomSheetOpened) {
      this.openBottomSheet();
    }
  }

  editWorkerClickHandler(workerViewModel: WorkerViewModel) {
    const dialogRef = this._editWorkerDialog.open(EditWorkerComponent, {
      data: workerViewModel,
      width: '60vh'
    });

    dialogRef.afterClosed().subscribe(worker => {
      if (worker !== undefined) {
        this._workerService.put(workerViewModel.worker.id, workerViewModel.worker).subscribe(putResult => {
          this._toastr.success(
            `Pomyślnie edytowano pracownika ${workerViewModel.worker.character.name} ${workerViewModel.worker.character.surname}.`);
        });
      }
    });
  }

  getSumOfSalaries() {
    return this._dataSource.data
      .map(worker => worker.worker.salary)
      .reduce((sum, current) => sum + current, 0);
  }
}
