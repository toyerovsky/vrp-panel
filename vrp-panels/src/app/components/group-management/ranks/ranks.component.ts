import { RanksAddRankComponent } from './elements/ranks-add-rank/ranks-add-rank.component';
import { GroupRankService } from '../../../service/group-rank.service';
import { GroupRankViewModel } from '../../../view-models/GroupRankViewModel';
import { GroupRight, GROUP_RIGHTS } from '../../../const/GroupRights';
import { GroupService } from '../../../service/group.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupModel } from '../../../models/GroupModel';
import GroupRankHelper from '../../../helpers/GroupRankHelper';
import { RanksEditRankComponent } from './elements/ranks-edit-rank/ranks-edit-rank.component';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {
  private _group: GroupModel;
  private _groupId: number;
  private _rights: GroupRight[];
  private _displayedColumns: string[] =
    ['select', 'name', 'salary', 'depositWithdrawMoney', 'recruitment', 'orders', 'doors', 'chat', 'offers'];
  private _dataReady: boolean;
  private _dataSource: MatTableDataSource<GroupRankViewModel> = new MatTableDataSource<GroupRankViewModel>();
  private _lastRanks: GroupRankViewModel[];
  private _selection = new SelectionModel<GroupRankViewModel>(true, []);

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _route: ActivatedRoute,
    private _groupService: GroupService,
    private _groupRankService: GroupRankService,
    private _toastr: ToastrService,
    private _addRankDialog: MatDialog,
    private _editRankDialog: MatDialog
  ) { }

  ngOnInit() {
    this._route.parent.paramMap.subscribe(params => {
      this._groupId = +params.get('id');
      this._dataReady = false;
      this._groupService.getById(this._groupId).subscribe(group => {
        if (group !== undefined) {
          this._group = group;
          this._rights = GROUP_RIGHTS.find(right => right.groupType == this._group.groupType).rights;
          this._lastRanks = group.groupRanks.map(rank => {
            return {
              rank: rank,
              rights: GroupRankHelper.rankToRights(rank)
            };
          });
          this._dataSource.data = this._lastRanks;
        }
        this._dataReady = true;
      });
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
    if (this.isAllSelected()) {
      this._selection.clear();
    } else {
      this._dataSource.data.forEach(row => this._selection.select(row));
    }
  }

  isAnythingSelected() {
    return this._selection.selected.length !== 0;
  }

  addRankClickHandler(): void {
    const dialogRef = this._editRankDialog.open(RanksAddRankComponent, {
      width: '60vh',
      data: this._group
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this._groupRankService.put(data.rank.id, data.rank).subscribe(postResult => {
          this._lastRanks.push(data);
          this._dataSource = new MatTableDataSource<GroupRankViewModel>(this._lastRanks);
          this._dataSource.sort = this.sort;
          this._toastr.success(`Pomyślnie dodano rangę ${postResult.name}.`);
        });
      }
    });
  }

  editRankClickHandler(viewModel: GroupRankViewModel): void {
    const dialogRef = this._editRankDialog.open(RanksEditRankComponent, {
      width: '60vh',
      data: {
        viewModel: viewModel,
        group: this._group
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this._groupRankService.put(data.rank.id, data.rank).subscribe(putResult => {
          this._toastr.success(`Pomyślnie edytowano rangę ${data.rank.name}.`);
        });
      }
    });
  }
}
