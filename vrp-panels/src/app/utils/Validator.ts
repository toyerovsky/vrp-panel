import { AccountService } from './../service/account.service';
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
    const any: boolean = excludedControls.some(excluded => excluded.dirty && control.dirty);
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

export function requiredIfValue(formControl: FormControl, value: number): ValidatorFn {
  return (control: AbstractControl) : { [key: string]: any } | null =>  {
    if (formControl.value == value && !control.dirty) {
      return {
        requiredIfValue: {
          value: control.value
        }
      }
    }
    else {
      return null
    }
  }
}

export function isNumberPlateTaken(vehicleService: VehicleService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return vehicleService.checkIfNumberPlateTaken(control.value)
      .pipe(
        map(res => { return res ? null : { isNumberPlateTaken: { value: control.value } } })
      );
  }
}

export function accountWithIdExists(accountService: AccountService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return accountService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { accountWithIdExists: false } })
      );
  }
}

export function characterWithIdExists(characterService: CharacterService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return characterService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { characterWithIdExists: false } })
      );
  }
}

export function buildingWithIdExists(buildingService: BuildingService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return buildingService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { buildingWithIdExists: false } })
      );
  }
}

export function vehicleWithIdExists(vehicleService: VehicleService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return vehicleService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { vehicleWithIdExists: false } })
      );
  }
}

export function groupWithIdExists(groupService: GroupService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return groupService.getById(control.value)
      .pipe(
        map(res => { return res ? null : { groupWithIdExists: false } })
      );
  }
}