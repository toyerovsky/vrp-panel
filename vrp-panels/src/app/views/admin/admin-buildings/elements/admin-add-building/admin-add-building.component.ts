import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BuildingModel } from '../../../../../models/BuildingModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map, max } from 'rxjs/operators';
import { VEHICLES } from '../../../../../const/Misc';
import { CharacterService } from '../../../../../service/character.service';
import { GroupService } from '../../../../../service/group.service';
import { isVehicleName, mutuallyExclusiveWith, isNumberPlateTaken, characterWithIdExists, groupWithIdExists } from '../../../../../utils/validators';
import { VehicleService } from '../../../../../service/vehicle.service';

@Component({
  selector: 'app-admin-add-building',
  templateUrl: './admin-add-building.component.html',
  styleUrls: ['../../../admin-dialog.scss']
})
export class AdminAddBuildingComponent implements OnInit {
  private _addVehicleForm: FormGroup;
  private _buildingModel: BuildingModel = new BuildingModel();
  private _interiors: any[] = VEHICLES;
  private _filteredInteriors: Observable<any[]>;

  constructor(
    private _dialogRef: MatDialogRef<AdminAddBuildingComponent>,
    private _characterService: CharacterService,
    private _groupService: GroupService
  ) {
  }

  ngOnInit() {
    this._addVehicleForm = new FormGroup({
      'name': new FormControl(this._buildingModel.name, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'description': new FormControl(this._buildingModel.description),
      'spawnPossible': new FormControl(this._buildingModel.spawnPossible, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'characterId': new FormControl(this._buildingModel.characterId, {
        asyncValidators: [
          characterWithIdExists(this._characterService)
        ],
        updateOn: 'blur'
      }),
      'groupId': new FormControl(this._buildingModel.groupId, {
        asyncValidators: [
          groupWithIdExists(this._groupService)
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionX': new FormControl(this._buildingModel.externalPickupPositionX, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionY': new FormControl(this._buildingModel.externalPickupPositionY, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
      'externalPickupPositionZ': new FormControl(this._buildingModel.externalPickupPositionZ, {
        validators: [
          Validators.required
        ],
        updateOn: 'blur'
      }),
    });
    this._filteredInteriors = of(this._interiors);
    this.characterId.setValidators([mutuallyExclusiveWith(this.groupId)]);
    this.groupId.setValidators([mutuallyExclusiveWith(this.characterId)]);
  }

  onVehicleHashChange(event: any) {
    this._filteredInteriors = of(this._interiors).pipe(
      startWith(''),
      map(vehicle => vehicle ? this.filterVehicles(event.target.value) : this._interiors.slice())
    );
  }

  get numberPlate(): FormControl {
    return this._addVehicleForm.controls.numberPlate as FormControl;
  }

  get name(): FormControl {
    return this._addVehicleForm.controls.name as FormControl;
  }

  get vehicleHash(): FormControl {
    return this._addVehicleForm.controls.vehicleHash as FormControl;
  }

  get characterId(): FormControl {
    return this._addVehicleForm.controls.characterId as FormControl;
  }

  get groupId(): FormControl {
    return this._addVehicleForm.controls.groupId as FormControl;
  }

  private filterVehicles(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this._interiors.filter(vehicle => vehicle.displayName.toLowerCase().indexOf(filterValue) === 0);
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  containsVehicle(name: string): boolean {
    return this._interiors.some(vehicle => vehicle.displayName == name);
  }

  onSubmit() {
    if (this._addVehicleForm.valid) {
      Object.assign(this._buildingModel, this._addVehicleForm.value);
      this._buildingModel.vehicleHash = this._interiors.find(vehicle => vehicle.displayName == this._buildingModel.vehicleHash).id;
      this._dialogRef.close(this._buildingModel);
    }
  }

  loadCharacterHandler(value: number): void {
    this._characterService.getById(value)
      .subscribe(data => this._buildingModel.character = data);
  }

  loadGroupHandler(value: number): void {
    this._groupService.getById(value)
      .subscribe(data => this._buildingModel.group = data);
  }
}