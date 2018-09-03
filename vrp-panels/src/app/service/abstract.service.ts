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
      if (error.status === 0) {
        this.toastr.error("Nie udało się nawiązać bezpiecznego połączenia z API.")
      }
      else if (error.status === 401) /* unauthorized */ {
        this.router.navigate(['login']);
      }
      else if (error.status === 403) /* forbidden */ {
        this.router.navigate(['forbidden']);
      }
      console.error(error);
      return of(result as T);
    };
  }
}