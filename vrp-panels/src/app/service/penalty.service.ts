import { PenaltyModel } from './../models/PenaltyModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PenaltyService extends AbstractService {
  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getAllByAccountId(accountId: number): Observable<PenaltyModel[]> {
    return this._http.get<PenaltyModel[]>(`${environment.apiUrl}/penalty/account/${accountId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<PenaltyModel[]>()));
  }

  public getAll(): Observable<PenaltyModel[]> {
    return this._http.get<PenaltyModel[]>(`${environment.apiUrl}/penalty/`, { withCredentials: true })
      .pipe(catchError(this.handleError<PenaltyModel[]>()));
  }

  public getById(id: number): Observable<PenaltyModel> {
    return this._http.get<PenaltyModel>(`${environment.apiUrl}/penalty/${id}`, { withCredentials: true })
      .pipe(catchError(this.handleError<PenaltyModel>()));
  }

  public post(penaltyModel: PenaltyModel): Observable<PenaltyModel> {
    return this._http.post<PenaltyModel>(`${environment.apiUrl}/penalty/`, penaltyModel, { withCredentials: true })
      .pipe(catchError(this.handleError<PenaltyModel>()));
  }

  public put(id: number, penaltyModel: PenaltyModel): Observable<PenaltyModel> {
    return this._http.post<PenaltyModel>(`${environment.apiUrl}/penalty/${id}`, penaltyModel, { withCredentials: true })
      .pipe(catchError(this.handleError<PenaltyModel>()));
  }

  public deactivate(deactivatorId: number, penaltyId: number, penaltyModel: PenaltyModel) {
    penaltyModel.deactivatorId = deactivatorId;
    return this._http.post<PenaltyModel>(`${environment.apiUrl}/penalty/deactivate/${penaltyId}`, penaltyModel, { withCredentials: true })
      .pipe(catchError(this.handleError<PenaltyModel>()));
  }
}
