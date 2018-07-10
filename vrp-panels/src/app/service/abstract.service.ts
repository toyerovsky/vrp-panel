import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export default class AbstractService {
    constructor(protected _toastr: ToastrService) {
    }

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // front end error
            console.log('Front-End Error:', error.error.message);
        } else {
            // http error
            console.log(`Back-End Error ` +
                `Http Status: ${error.status}, ` +
                `Body: ${JSON.parse(error.error)}`);
        }

        this._toastr.error("Wystąpił wyjątek w aplikacji. Prosimy zgłosić problem przez forum.")
        return throwError("");
    }
}