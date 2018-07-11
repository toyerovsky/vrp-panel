import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export default class AbstractService {
    _toastr: ToastrService;

    constructor(toastr: ToastrService) {
        this._toastr = toastr;
    }

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // front end error
            console.log('Front-End Error:', error.error.message);
        } else {
            // http error
            if (error != undefined) {
                console.log(`Back-End Error ` +
                    `Http Status: ${error.status}, ` +
                    `Body: ${JSON.stringify(error.error)}`);
            }

            // if (error.status === 0) {
            //     this._toastr.error("Nie udało się nawiązać bezpiecznego połączenia z API.");
            // }

        }
        return throwError("");
    }
}