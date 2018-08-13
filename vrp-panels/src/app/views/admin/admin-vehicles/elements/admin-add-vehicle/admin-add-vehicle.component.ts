import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityInfo, JsonService } from '../../../../../service/json.service';
import { MatDialogRef, MatAutocomplete } from '@angular/material';
import { VehicleModel } from '../../../../../models/VehicleModel';
import { FormControl, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map, max } from 'rxjs/operators';
import { VEHICLES } from '../../../../../const/Misc';
import { CharacterService } from '../../../../../service/character.service';
import { isVehicleName } from '../../../../../utils/validators';
import { GroupService } from '../../../../../service/group.service';

@Component({
  selector: 'app-admin-add-vehicle',
  templateUrl: './admin-add-vehicle.component.html',
  styleUrls: ['./admin-add-vehicle.component.css']
})
export class AdminAddVehicleComponent implements OnInit {
  private _addVehicleForm: FormGroup;
  private _vehicleModel: VehicleModel = new VehicleModel();
  private _vehicles: any[] = VEHICLES;
  private _filteredVehicles: Observable<any[]>;

  constructor(
    private _dialogRef: MatDialogRef<AdminAddVehicleComponent>,
    private _jsonService: JsonService,
    private _characterService: CharacterService,
    private _groupService: GroupService
  ) {
  }

  ngOnInit() {
    this._addVehicleForm = new FormGroup({
      'numberPlate': new FormControl('', [
        Validators.maxLength(11)
      ]),
      'name': new FormControl(''),
      'vehicleHash': new FormControl('', {
        validators: [
          Validators.required,
          isVehicleName
        ],
        updateOn: 'blur'
      }),
      'characterId': new FormControl({ value: '' }),
      'groupId': new FormControl({ value: '' }),
    });
    this._filteredVehicles = of(this._vehicles);
  }

  onVehicleHashChange(event: any) {
    this._filteredVehicles = of(this._vehicles).pipe(
      startWith(''),
      map(vehicle => vehicle ? this.filterVehicles(event.target.value) : this._vehicles.slice())
    );
  }

  get numberPlate() {
    return this._addVehicleForm.controls.numberPlate as FormControl;
  }

  get name() {
    return this._addVehicleForm.controls.name as FormControl;
  }

  get vehicleHash() {
    return this._addVehicleForm.controls.vehicleHash as FormControl;
  }

  get characterId() {
    return this._addVehicleForm.controls.characterId as FormControl;
  }

  get groupId() {
    return this._addVehicleForm.controls.groupId as FormControl;
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
    if (this._addVehicleForm.valid) {
      Object.assign(this._vehicleModel, this._addVehicleForm.value);
      this._vehicleModel.vehicleHash = this._vehicles.find(vehicle => vehicle.displayName == this._vehicleModel.vehicleHash).id;
      this._dialogRef.close(this._vehicleModel);
    }
  }

  loadCharacterHandler(event: any): void {
    let value = event.target.value;
    this._characterService.getById(value)
      .subscribe(data => this._vehicleModel.character = data);
  }

  loadGroupHandler(event: any): void {
    let value = event.target.value;
    this._groupService.getById(value)
      .subscribe(data => this._vehicleModel.group = data);
  }
}