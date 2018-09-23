import { GroupDetailsComponent } from './elements/group-details/group-details.component';
import { GroupModel } from '../../../models/GroupModel';
import { GroupService } from '../../../service/group.service';
import { AccountService } from '../../../service/account.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'player-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['../player.scss', './groups.component.scss']
})
export class GroupsComponent implements OnInit {
  private _dataReady: boolean;
  private _playerGroups: GroupModel[] = [];

  constructor(
    private _dialog: MatDialog,
    private _groupService: GroupService,
    private _accountService: AccountService
  ) {
  }

  ngOnInit() {
    this._groupService.getAllByAccountId(this._accountService.currentUserId)
      .subscribe(groups => {
        this._playerGroups = groups;
        this._dataReady = true;
      });
  }

  openDetails(group: GroupModel): void {
    this._dialog.open(GroupDetailsComponent, {
      data: group,
      width: '80vh',
      minHeight: '250px'
    });
  }
}
