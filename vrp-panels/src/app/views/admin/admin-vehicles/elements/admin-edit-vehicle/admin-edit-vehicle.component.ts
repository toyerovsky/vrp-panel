import { Component, OnInit, Inject } from '@angular/core';
import { VehicleModel } from '../../../../../models/VehicleModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminEditCharacterComponent } from '../../../admin-characters/elements/admin-edit-character/admin-edit-character.component';
import { EntityInfo, JsonService } from '../../../../../service/json.service';

@Component({
  selector: 'app-admin-edit-vehicle',
  templateUrl: './admin-edit-vehicle.component.html',
  styleUrls: ['./admin-edit-vehicle.component.scss']
})
export class AdminEditVehicleComponent implements OnInit {
  private _vehicles: EntityInfo[];

  constructor(
    private _dialogRef: MatDialogRef<AdminEditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicleModel: VehicleModel,
    private _jsonService: JsonService
  ) {

  }

  ngOnInit() {
    this._jsonService.getVehicles()
      .subscribe(vehicles => this._vehicles = vehicles);
  }

  saveHandler(): void {
    this._dialogRef.close(this.vehicleModel)
  }

  closeDialog(): void {
    this._dialogRef.close();
  }
}