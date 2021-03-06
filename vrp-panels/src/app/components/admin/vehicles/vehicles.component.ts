import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator} from '@angular/material';
import { VehicleService } from '../../../service/vehicle.service';
import { VehicleModel } from '../../../models/VehicleModel';
import { ToastrService } from 'ngx-toastr';

// dialogs
import { AddVehicleComponent } from './elements/admin-add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './elements/admin-edit-vehicle/edit-vehicle.component';

@Component({
  selector: 'admin-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['../admin-table.scss']
})
export class VehiclesComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'numberPlate', 'name', 'vehicleHash', 'health', 'owner'];
  private _dataSource = new MatTableDataSource<VehicleModel>();
  private _lastVehicles: VehicleModel[];
  private _dataReady: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _vehicleService: VehicleService,
    private _addVehicleDialog: MatDialog,
    private _editVehicleDialog: MatDialog,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._vehicleService.getAll().subscribe(vehicles => {
      if (vehicles !== undefined) {
        this._lastVehicles = vehicles || [];
        this._dataSource.data = this._lastVehicles;
      }
      this._dataReady = true;
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    });
  }

  addVehicleClickHandler() {
    const dialogRef = this._addVehicleDialog.open(AddVehicleComponent, {
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._vehicleService.post(result).subscribe(postResult => {
          this._lastVehicles.push(postResult);
          this._dataSource = new MatTableDataSource<VehicleModel>(this._lastVehicles);
          this._dataSource.sort = this.sort;
          this._toastrService.success(`Pomyślnie dodano pojazd: ${postResult.name}`);
        });
      }
    });
  }

  editVehicleClickHandler(vehicleModel: VehicleModel) {
    this._vehicleService.getById(vehicleModel.id).subscribe(vehicle => {
      Object.assign(vehicleModel, vehicle);
    }); // we do this to get all of the properties

    const dialogRef = this._editVehicleDialog.open(EditVehicleComponent, {
      data: vehicleModel,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._vehicleService.put(result.id, result).subscribe(putResult => {
          this._toastrService.success(`Pomyślnie edytowano pojazd: ${result.name}`);
        });
      }
    });
  }

  searchHandler(filter: string) {
    this._dataSource.filter = filter.trim().toLowerCase();
  }
}
