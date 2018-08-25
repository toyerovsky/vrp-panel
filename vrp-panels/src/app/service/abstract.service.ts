import { throwError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export default class AbstractService {
  _toastr: ToastrService;

  constructor(toastr: ToastrService) {
    this._toastr = toastr;
  }

  protected handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}