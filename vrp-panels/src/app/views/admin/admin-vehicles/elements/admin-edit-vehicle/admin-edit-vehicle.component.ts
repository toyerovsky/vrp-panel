import { Component, OnInit, Inject } from '@angular/core';
import { VehicleModel } from '../../../../../models/VehicleModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminEditCharacterComponent } from '../../../admin-characters/elements/admin-edit-character/admin-edit-character.component';

@Component({
  selector: 'app-admin-edit-vehicle',
  templateUrl: './admin-edit-vehicle.component.html',
  styleUrls: ['./admin-edit-vehicle.component.css']
})
export class AdminEditVehicleComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<AdminEditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicleModel: VehicleModel
  ) {
  }

  ngOnInit() {
  }

  saveHandler(): void {
    this._dialogRef.close(this.vehicleModel)
  }

  closeDialog(): void {
    this._dialogRef.close();
  }
}