import { GroupRankViewModel } from './../../../viewModels/GroupRankViewModel';
import { GroupRight, GROUP_RIGHTS } from './../../../const/GroupRights';
import { GroupService } from './../../../service/group.service';
import { GroupRankModel } from './../../../models/GroupRankModel';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { GroupModel } from '../../../models/GroupModel';
import GroupRankHelper from '../../../helpers/GroupRankHelper';
import { RanksEditRankComponent } from './elements/ranks-edit-rank/ranks-edit-rank.component';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {
  private _group: GroupModel;
  private _groupId: number;
  private _rights: GroupRight[];
  private _displayedColumns: string[] = ['index', 'name', 'salary', 'depositWithdrawMoney', 'recruitment', 'orders', 'doors', 'chat', 'offers'];
  private _dataReady: boolean;
  private _dataSource: MatTableDataSource<GroupRankViewModel> = new MatTableDataSource<GroupRankViewModel>();
  private _lastRanks: GroupRankModel[];

  constructor(
    private _route: ActivatedRoute,
    private _groupService: GroupService,
    private _addRankDialog: MatDialog,
    private _editRankDialog: MatDialog
  ) { }

  ngOnInit() {
    this._route.parent.paramMap.subscribe(params => {
      this._groupId = +params.get('id');
      this._dataReady = false;
      this._groupService.getById(this._groupId).subscribe(group => {
        if (group != undefined) {
          this._group = group;
          this._rights = GROUP_RIGHTS.find(right => right.groupType == this._group.groupType).rights;
          this._dataSource.data = group.groupRanks.map(rank => {
            return {
              rank: rank,
              rights: GroupRankHelper.rankToRights(rank)
            }
          });
        }
        this._dataReady = true;
      });
    });
  }

  addRankClickHandler(): void {

  }

  editRankClickHandler(viewModel: GroupRankViewModel): void {
    const dialogRef = this._editRankDialog.open(RanksEditRankComponent, {
      data: {
        viewModel: viewModel,
        group: this._group
      }
    })
  }
}
