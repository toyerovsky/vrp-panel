import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketModel } from '../models/TicketModel';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends AbstractService {

  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getByAccountId(id: number): Observable<TicketModel[]> {
    return this._http.get<TicketModel[]>(`${environment.apiUrl}/ticket/account/${id}`, { withCredentials: true })
      .pipe(catchError(this.handleError<TicketModel[]>()));
  }

  public getById(id: number): Observable<TicketModel> {
    return this._http.get<TicketModel>(`${environment.apiUrl}/ticket/${id}`, { withCredentials: true })
      .pipe(catchError(this.handleError<TicketModel>()));
  }
}
