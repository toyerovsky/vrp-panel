import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { GroupService } from "../../../service/group.service";
import { GroupModel } from "../../../models/GroupModel";
import { PL_PAGINATOR_INTL } from "../../../const/MaterialConstants";
import { ToastrService } from "ngx-toastr";
import { AdminAddGroupComponent } from "./elements/admin-add-group/admin-add-group.component";
import { AdminEditGroupComponent } from "./elements/admin-edit-group/admin-edit-group.component";

@Component({
  selector: "app-admin-groups",
  templateUrl: "./admin-groups.component.html",
  styleUrls: ["../admin-table.scss"]
})
export class AdminGroupsComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'name', 'tag', 'groupType', 'money', 'maxPayday'];
  private _dataSource = new MatTableDataSource<GroupModel>();
  private _lastGroups: GroupModel[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _groupService: GroupService,
    private _toastrService: ToastrService,
    private _addGroupDialog: MatDialog,
    private _editGroupDialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this._groupService.getAll().subscribe(groups => {
      if (groups != undefined) {
        this._lastGroups = groups;
        this._dataSource.data = this._lastGroups;
      }
    });

    this._dataSource.sort = this.sort;
    this.paginator._intl.firstPageLabel = PL_PAGINATOR_INTL.firstPageLabel;
    this.paginator._intl.itemsPerPageLabel = PL_PAGINATOR_INTL.itemsPerPageLabel;
    this.paginator._intl.lastPageLabel = PL_PAGINATOR_INTL.lastPageLabel;
    this.paginator._intl.nextPageLabel = PL_PAGINATOR_INTL.nextPageLabel;
    this.paginator._intl.previousPageLabel = PL_PAGINATOR_INTL.previousPageLabel;
    this._dataSource.paginator = this.paginator;
  }

  addGroupClickHandler() {
    const dialogRef = this._addGroupDialog.open(AdminAddGroupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
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
    const dialogRef = this._editGroupDialog.open(AdminEditGroupComponent, {
      data: groupModel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
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
