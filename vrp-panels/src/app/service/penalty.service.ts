import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';
import { PenaltyModel } from '../models/PenaltyModel';

@Injectable({ providedIn: 'root' })
export class PenaltyService extends AbstractService {
  constructor(toastr: ToastrService, private _http: HttpClient) {
    super(toastr);
  }

  public getAllByAccountId(accountId: number): Observable<PenaltyModel[]> {
    return this._http.get<PenaltyModel[]>(
        `${environment.apiUrl}/penalty/account/${accountId}`,
        { withCredentials: true }
      )
      .pipe(catchError(this.handleError));
  }
}
