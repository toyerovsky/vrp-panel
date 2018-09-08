import { WorkerViewModel } from './../../../viewModels/WorkerViewModel';
import { GroupRight, GROUP_RIGHTS } from './../../../const/GroupRights';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupModel } from '../../../models/GroupModel';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../service/group.service';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBarRef, MatSnackBar, MatBottomSheet } from '@angular/material';
import GroupRightsHelper from '../../../helpers/GroupRankHelper';
import { ActionBottomSheetComponent } from './elements/action-bottom-sheet/action-bottom-sheet.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  private _group: GroupModel;
  private _displayedColumns: string[] =
    ['select', 'name', 'duty', 'rank', 'salary', 'depositWithdrawMoney', 'recruitment', 'orders', 'doors', 'chat', 'offers'];
  private _dataSource = new MatTableDataSource<WorkerViewModel>();
  private _dataReady: boolean;
  private _selection = new SelectionModel<WorkerViewModel>(true, []);
  private _rights: GroupRight[];
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _route: ActivatedRoute,
    private _groupService: GroupService,
    private _toastr: ToastrService,
    private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      let groupId = +params.get('id');
      this._groupService.getById(groupId).subscribe(group => {
        if (group != undefined) {
          this._group = group;
          this._rights = GROUP_RIGHTS.find(right => right.groupType == this._group.groupType).rights;
          this._dataSource.data = group.workers.map(worker => {
            return {
              worker: worker,
              rights: GroupRightsHelper.getRanks(worker)
            }
          });
        } else {
          this._toastr.error(`Nie odnaleziono grupy o id ${groupId}.`)
        }
        this._dataReady = true;
      })
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this._selection.selected.length;
    const numRows = this._dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this._selection.clear() :
      this._dataSource.data.forEach(row => this._selection.select(row));
  }

  openSnackBar() {
    this._bottomSheet.open(ActionBottomSheetComponent, {
      data: this._selection.selected,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'bottom-sheet-container-small',
    });
    this._bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(data => this.masterToggle());
  }
}