import { Component, OnInit, Inject } from '@angular/core';
import { VehicleModel } from '../../../../../models/VehicleModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminEditCharacterComponent } from '../../../admin-characters/elements/admin-edit-character/admin-edit-character.component';
import { EntityInfo, JsonService } from '../../../../../service/json.service';
import { VEHICLES } from '../../../../../const/Misc';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { mutuallyExclusiveWith, isVehicleName, isNumberPlateTaken, groupWithIdExists, characterWithIdExists } from '../../../../../utils/validators';
import { VehicleService } from '../../../../../service/vehicle.service';
import { GroupService } from '../../../../../service/group.service';
import { CharacterService } from '../../../../../service/character.service';

@Component({
  selector: 'app-admin-edit-vehicle',
  templateUrl: './admin-edit-vehicle.component.html',
  styleUrls: ['./admin-edit-vehicle.component.scss']
})
export class AdminEditVehicleComponent implements OnInit {
  private _editVehicleForm: FormGroup;
  private _vehicles: any[] = VEHICLES;
  private _filteredVehicles: Observable<any[]>;

  constructor(
    private _dialogRef: MatDialogRef<AdminEditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicleModel: VehicleModel,
    private _vehicleService: VehicleService,
    private _groupService: GroupService,
    private _characterService: CharacterService
  ) {
  }

  ngOnInit() {
    this._editVehicleForm = new FormGroup({
      'numberPlate': new FormControl(this.vehicleModel.numberPlate, {
        validators: [
          Validators.maxLength(11)
        ],
        asyncValidators: [
          isNumberPlateTaken(this._vehicleService)
        ],
        updateOn: 'blur'
      }),
      'name': new FormControl(this.vehicleModel.name),
      'vehicleHash': new FormControl(this.vehicleModel.vehicleHash, {
        validators: [
          Validators.required,
          isVehicleName
        ],
        updateOn: 'blur'
      }),
      'characterId': new FormControl(this.vehicleModel.characterId, {
        asyncValidators: [
          characterWithIdExists(this._characterService)
        ],
        updateOn: 'blur'
      }),
      'groupId': new FormControl(this.vehicleModel.groupId, {
        asyncValidators: [
          groupWithIdExists(this._groupService)
        ],
        updateOn: 'blur'
      }),
      'milage': new FormControl(this.vehicleModel.milage)
    });
    this._filteredVehicles = of(this._vehicles);
    this.characterId.setValidators([mutuallyExclusiveWith(this.groupId)]);
    this.groupId.setValidators([mutuallyExclusiveWith(this.characterId)]);
  }

  onVehicleHashChange(event: any) {
    this._filteredVehicles = of(this._vehicles).pipe(
      startWith(''),
      map(vehicle => vehicle ? this.filterVehicles(event.target.value) : this._vehicles.slice())
    );
  }

  get numberPlate(): FormControl {
    return this._editVehicleForm.controls.numberPlate as FormControl;
  }

  get name(): FormControl {
    return this._editVehicleForm.controls.name as FormControl;
  }

  get vehicleHash(): FormControl {
    return this._editVehicleForm.controls.vehicleHash as FormControl;
  }

  get characterId(): FormControl {
    return this._editVehicleForm.controls.characterId as FormControl;
  }

  get groupId(): FormControl {
    return this._editVehicleForm.controls.groupId as FormControl;
  }

  private filterVehicles(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this._vehicles.filter(vehicle => vehicle.displayName.toLowerCase().indexOf(filterValue) === 0);
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  containsVehicle(name: string): boolean {
    return this._vehicles.some(vehicle => vehicle.displayName == name);
  }

  onSubmit() {
    if (this._editVehicleForm.valid) {
      Object.assign(this.vehicleModel, this._editVehicleForm.value);
      this.vehicleModel.vehicleHash = this._vehicles.find(vehicle => vehicle.displayName == this.vehicleModel.vehicleHash).id;
      this._dialogRef.close(this.vehicleModel);
    }
  }

  loadCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => this.vehicleModel.character = data);
  }

  loadGroupHandler(value: number): void {
    this._groupService.getById(value)
      .subscribe(data => this.vehicleModel.group = data);
  }
}