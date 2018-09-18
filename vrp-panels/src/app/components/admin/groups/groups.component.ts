import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { GroupService } from '../../../service/group.service';
import { GroupModel } from '../../../models/GroupModel';
import { ToastrService } from 'ngx-toastr';
import { AddGroupComponent } from './elements/admin-add-group/add-group.component';
import { EditGroupComponent } from './elements/admin-edit-group/edit-group.component';

@Component({
  selector: 'admin-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['../admin-table.scss']
})
export class GroupsComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'name', 'tag', 'groupType', 'money', 'maxPayday'];
  private _dataSource = new MatTableDataSource<GroupModel>();
  private _lastGroups: GroupModel[] = [];
  private _dataReady: boolean;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _groupService: GroupService,
    private _toastrService: ToastrService,
    private _addGroupDialog: MatDialog,
    private _editGroupDialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this._groupService.getAll().subscribe(groups => {
      if (groups !== undefined) {
        this._lastGroups = groups || [];
        this._dataSource.data = this._lastGroups;
      }
      this._dataReady = true;
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    });
  }

  addGroupClickHandler() {
    const dialogRef = this._addGroupDialog.open(AddGroupComponent, {
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._groupService.post(result).subscribe(postResult => {
          this._lastGroups.push(postResult);
          this._dataSource = new MatTableDataSource<GroupModel>(this._lastGroups);
          this._dataSource.sort = this.sort;
          this._toastrService.success(`Pomyślnie dodano grupę: ${postResult.name}`);
        });
      }
    });
  }

  editGroupClickHandler(groupModel: GroupModel) {
    this._groupService.getById(groupModel.id).subscribe(group => {
      Object.assign(groupModel, group);
    }); // we do this to get all of the properties

    const dialogRef = this._editGroupDialog.open(EditGroupComponent, {
      data: groupModel,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._groupService.put(result.id, result).subscribe(putResult => {
          this._toastrService.success(`Pomyślnie edytowano grupę: ${result.name}`);
        });
      }
    });
  }

  searchHandler(filter: string) {
    this._dataSource.filter = filter.trim().toLowerCase();
  }
}
