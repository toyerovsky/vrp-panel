import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { GroupService } from "../../../service/group.service";
import { GroupModel } from "../../../models/GroupModel";

@Component({
  selector: "app-admin-groups",
  templateUrl: "./admin-groups.component.html",
  styleUrls: ["./admin-groups.component.css"]
})
export class AdminGroupsComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'name', 'tag', 'groupType', 'money', 'maxPayday'];
  private _dataSource = new MatTableDataSource<GroupModel>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private _group: GroupService) {}

  ngOnInit() {
    this._group.getAll().subscribe(groups => {
      console.log(groups);

        this._dataSource.data = groups;
        console.log(this._dataSource.data);

    });
    this._dataSource.sort = this.sort;
  }
}
