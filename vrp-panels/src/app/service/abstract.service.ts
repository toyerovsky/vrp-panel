import { throwError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export default class AbstractService {
  private toastr: ToastrService;
  private router: Router;

  constructor(
    toastr: ToastrService,
    router: Router) {
    this.toastr = toastr;
    this.router = router;
  }

  protected handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      if (error.status == 403) {
        this.router.navigate(['forbidden']);
      }
      return of(result as T);
    };
  }
}