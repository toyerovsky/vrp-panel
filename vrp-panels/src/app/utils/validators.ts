import { AsyncValidatorFn, AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { VEHICLES } from "../const/Misc";

export const isVehicleName: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const any: boolean =
        VEHICLES.some(vehicle => vehicle.displayName.toLowerCase() == control.value.toLowerCase());
    return any ? null : {
        isVehicleName: {
            value: control.value
        }
    };
}