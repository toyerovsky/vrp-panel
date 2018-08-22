import { BuildingService } from '../service/building.service';
import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors, FormControl, AsyncValidatorFn } from "@angular/forms";
import { VEHICLES } from "../const/Misc";
import { VehicleService } from "../service/vehicle.service";
import { map } from "rxjs/operators";
import { CharacterService } from "../service/character.service";
import { GroupService } from "../service/group.service";

export function isVehicleName(): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const any: boolean = VEHICLES.some(vehicle => vehicle.displayName.toLowerCase() == control.value.toLowerCase());
    if (!any) {
      return {
        isVehicleName: {
          value: control.value
        }
      };
    }
    return null;
  };
}

export function mutuallyExclusiveWith(...excludedControls: FormControl[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const any: boolean = excludedControls.some(excluded => excluded.value != null && excluded.value.toString().trim() != '');
    if (any) {
      return {
        mutuallyExclusiveWith: {
          value: control.value
        }
      };
    }
    return null;
  };
}

export function isNumberPlateTaken(vehicleService: VehicleService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return vehicleService.checkIfNumberPlateTaken(control.value)
      .pipe(
        map(res => { return res ? null : { isNumberPlateTaken: true } })
      );
  }
}

export function characterWithIdExists(characterService: CharacterService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return characterService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { characterWithIdExists: true } })
      );
  }
}

export function buildingWithIdExists(buildingService: BuildingService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return buildingService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { buildingWithIdExists: true } })
      );
  }
}

export function vehicleWithIdExists(vehicleService: VehicleService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return vehicleService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { vehicleWithIdExists: true } })
      );
  }
}

export function groupWithIdExists(groupService: GroupService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return groupService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { groupWithIdExists: true } })
      );
  }
}