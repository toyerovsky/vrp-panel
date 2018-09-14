import { VehicleService } from './../../../service/vehicle.service';
import { VehicleModel } from './../../../models/VehicleModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  private _groupId: number;
  private _displayedColumns: string[] = ['index', 'name', 'numberPlate', 'fuel', 'milage', 'health'];
  private _dataReady: boolean;
  private _dataSource: MatTableDataSource<VehicleModel> = new MatTableDataSource<VehicleModel>();

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _route: ActivatedRoute,
    private _vehicleService: VehicleService) { }

  ngOnInit() {
    this._route.parent.paramMap.subscribe(params => {
      this._groupId = +params.get('id');
      this._dataReady = false;
      this._vehicleService.getAllByGroupId(this._groupId).subscribe(buildings => {
        if (buildings != undefined) {
          this._dataSource.data = buildings;
        }
        this._dataReady = true;
      });
    });
  }

}
