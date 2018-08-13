import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors, FormControl } from "@angular/forms";
import { VEHICLES } from "../const/Misc";

export const isVehicleName: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
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