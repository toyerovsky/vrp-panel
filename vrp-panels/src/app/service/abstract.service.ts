import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export default class AbstractService {
    constructor(protected _toastr: ToastrService) {
    }

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // front end error
            console.log('Błąd:', error.error.message);
        } else {
            // http error
            console.log(
                `Http ${error.status}, ` +
                `Body was: ${error.error}`);
        }
        
        return throwError(
            'Something bad happened; please try again later.');
    }
}