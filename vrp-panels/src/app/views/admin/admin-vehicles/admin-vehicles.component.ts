import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { VehicleService } from '../../../service/vehicle.service';
import { VehicleModel } from '../../../models/VehicleModel';
import { ToastrService } from 'ngx-toastr';
import { PL_PAGINATOR_INTL } from '../../../const/MaterialConstants';
// dialogs
import { AdminAddVehicleComponent } from './elements/admin-add-vehicle/admin-add-vehicle.component';
import { AdminEditVehicleComponent } from './elements/admin-edit-vehicle/admin-edit-vehicle.component';
import { config } from 'rxjs';

@Component({
  selector: 'app-admin-vehicles',
  templateUrl: './admin-vehicles.component.html',
  styleUrls: ['../admin-table.scss']
})
export class AdminVehiclesComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'numberPlate', 'name', 'vehicleHash', 'health', 'owner'];
  private _dataSource = new MatTableDataSource<VehicleModel>();
  private _lastVehicles: VehicleModel[];
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
        this._lastVehicles = vehicles;
        this._dataSource.data = this._lastVehicles;
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

  addVehicleClickHandler() {
    const dialogRef = this._addVehicleDialog.open(AdminAddVehicleComponent);

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
    const dialogRef = this._editVehicleDialog.open(AdminEditVehicleComponent, {
      data: vehicleModel
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