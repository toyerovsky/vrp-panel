import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketModel } from '../models/TicketModel';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends AbstractService {

  constructor(
    toastr: ToastrService,
    private _http: HttpClient) {
    super(toastr);
  }

  public GetByAccountId(id: number): Observable<TicketModel[]>{
    return this._http.get<TicketModel[]>(`${environment.apiUrl}/ticket/account/${id}`,{withCredentials: true})
    .pipe(catchError(this.handleError))
  }

  public GetById(id: number): Observable<TicketModel>{
    return this._http.get<TicketModel>(`${environment.apiUrl}/ticket/${id}`,{withCredentials: true})
    .pipe(catchError(this.handleError))
  }
}