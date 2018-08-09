import { Component, OnInit } from '@angular/core';
import { EntityInfo, JsonService } from '../../../../../service/json.service';
import { MatDialogRef } from '@angular/material';
import { VehicleModel } from '../../../../../models/VehicleModel';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-add-vehicle',
  templateUrl: './admin-add-vehicle.component.html',
  styleUrls: ['./admin-add-vehicle.component.css']
})
export class AdminAddVehicleComponent implements OnInit {
  private _vehicles: EntityInfo[];
  private _vehicleModel: VehicleModel;
  private _vehicleCtrl: FormControl;
  private _filteredVehicles: Observable<EntityInfo[]>;

  constructor(
    private _dialogRef: MatDialogRef<AdminAddVehicleComponent>,
    private _jsonService: JsonService
  ) {
  }

  ngOnInit() {
    this._vehicleModel = new VehicleModel();
    this._vehicleCtrl = new FormControl();
    this._jsonService.getVehicles()
      .subscribe(vehicles => {
        this._vehicles = vehicles
        this._filteredVehicles = this._vehicleCtrl.valueChanges
          .pipe(
            startWith(''),
            map(vehicle => vehicle ? this.filterVehicles(vehicle) : this._vehicles.slice())
          );
      });
  }

  onVehicleModelChange(): void {
    this._vehicleModel.vehicleHash = this.getHashByName(this._vehicleCtrl.value);
  }

  private filterVehicles(value: string): EntityInfo[] {
    const filterValue = value.toLowerCase();
    return this._vehicles.filter(vehicle => vehicle.displayName.toLowerCase().indexOf(filterValue) === 0);
  }

  saveHandler(): void {
    this._dialogRef.close(this._vehicleModel)
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  getHashByName(name: string): string {
    return this._vehicles.find(vehicle => vehicle.displayName == name).id.toString();
  }

  containsVehicle(name: string): boolean {
    return this._vehicles.some(vehicle => vehicle.displayName == name);
  }
}