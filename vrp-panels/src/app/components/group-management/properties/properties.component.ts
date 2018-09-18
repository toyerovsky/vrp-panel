import { BuildingService } from '../../../service/building.service';
import { BuildingModel } from '../../../models/BuildingModel';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  private _groupId: number;
  private _displayedColumns: string[] = ['index', 'name', 'description', 'spawnPossible', 'position'];
  private _dataReady: boolean;
  private _dataSource = new MatTableDataSource<BuildingModel>();

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _route: ActivatedRoute,
    private _buildingService: BuildingService) { }

  ngOnInit() {
    this._route.parent.paramMap.subscribe(params => {
      this._groupId = +params.get('id');
      this._dataReady = false;
      this._buildingService.getAllByGroupId(this._groupId).subscribe(buildings => {
        if (buildings !== undefined) {
          this._dataSource.data = buildings;
        }
        this._dataReady = true;
      });
    });
  }

}
