import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import AbstractService from './abstract.service';
import { GroupRankModel } from '../models/GroupRankModel';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupRankService extends AbstractService {
  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getAllByGroupId(groupId: number): Observable<GroupRankModel[]> {
    return this._http.get<GroupRankModel[]>(`${environment.apiUrl}/grouprank/group/${groupId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<GroupRankModel[]>()));
  }

  public getById(characterId: number): Observable<GroupRankModel> {
    return this._http.get<GroupRankModel>(`${environment.apiUrl}/grouprank/${characterId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<GroupRankModel>()));
  }

  public getAll(): Observable<GroupRankModel[]> {
    return this._http.get<GroupRankModel[]>(`${environment.apiUrl}/grouprank/`, { withCredentials: true })
      .pipe(catchError(this.handleError<GroupRankModel[]>()));
  }

  public post(groupRankModel: GroupRankModel): Observable<GroupRankModel> {
    return this._http.post<GroupRankModel>(`${environment.apiUrl}/grouprank/`, groupRankModel, { withCredentials: true })
      .pipe(catchError(this.handleError<GroupRankModel>()));
  }

  public put(groupRankId: number, groupRankModel: GroupRankModel): Observable<GroupRankModel> {
    return this._http.put<GroupRankModel>(`${environment.apiUrl}/grouprank/${groupRankId}`, groupRankModel, { withCredentials: true })
      .pipe(catchError(this.handleError<GroupRankModel>()));
  }

  public delete(groupRankId: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/grouprank/${groupRankId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<void>()));
  }
}
