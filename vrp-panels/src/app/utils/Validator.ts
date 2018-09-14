import { Observable, of } from 'rxjs';
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

export function requiredIfValues(formControl: FormControl, ...values: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (values.some(v => v == formControl.value) && control.value == null) {
      return {
        requiredIfValues: {
          value: control.value
        }
      }
    }
    else {
      return null;
    }
  }
}

export function isNumberPlateTaken(vehicleService: VehicleService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return vehicleService.checkIfNumberPlateTaken(control.value).pipe(
      map(res => !res ? null : { isNumberPlateTaken: { value: control.value } })
    );
  }
}

export function noAccountWithId(accountService: AccountService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (control.value != null) {
      return accountService.getById(control.value)
        .pipe(
          map(res => res == null ? { noAccountWithId: true } : null)
        );
    } else {
      return of(null);
    }
  }
}

export function noCharacterWithId(characterService: CharacterService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (control.value != null) {
      return characterService.getById(control.value)
        .pipe(
          map(res => res ? null : { characterWithIdExists: false })
        );
    } else {
      return of(null);
    }
  }
}

export function noBuildingWithId(buildingService: BuildingService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (control.value != null) {
      return buildingService.getById(control.value)
        .pipe(
          map(res => { return res ? null : { buildingWithIdExists: false } })
        );
    }
    else {
      return of(null);
    }
  }
}

export function noVehicleWithId(vehicleService: VehicleService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (control.value != null) {
      return vehicleService.getById(control.value)
        .pipe(
          map(res => { return res ? null : { vehicleWithIdExists: false } })
        );
    }
    else {
      return of(null);
    }
  }
}

export function noGroupWithId(groupService: GroupService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (control.value != null) {
      return groupService.getById(control.value)
        .pipe(
          map(res => { return res ? null : { groupWithIdExists: false } })
        );
    } else {
      return of(null);
    }
  }
}