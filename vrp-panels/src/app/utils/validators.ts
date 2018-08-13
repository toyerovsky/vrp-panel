import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors, FormControl } from "@angular/forms";
import { VEHICLES } from "../const/Misc";

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

export function mutuallyExclusiveWith(excluded: FormControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (typeof (excluded.value) != 'object' && excluded.value.toString().trim() != '') {
            return {
                mutuallyExclusiveWith: {
                    value: control.value
                }
            };
        }
        return null;
    };
}