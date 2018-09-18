import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export default class AbstractService {
  constructor(
    private toastr: ToastrService,
    private router: Router) {
  }

  protected handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 0) {
        this.toastr.error('Nie udało się nawiązać bezpiecznego połączenia z API.');
      } else if (error.status === 401) /* unauthorized */ {
        this.router.navigate(['login']);
      } else if (error.status === 403) /* forbidden */ {
        this.router.navigate(['forbidden']);
      }
      console.error(error);
      return of(result as T);
    };
  }
}
