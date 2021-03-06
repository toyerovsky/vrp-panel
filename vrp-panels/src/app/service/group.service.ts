import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';
import { GroupModel } from '../models/GroupModel';
import { WorkerModel } from '../models/WorkerModel';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GroupService extends AbstractService {
  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getAllByAccountId(accountId: number): Observable<GroupModel[]> {
    return this._http.get<GroupModel[]>(`${environment.apiUrl}/group/account/${accountId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<GroupModel[]>()));
  }

  public getAll(): Observable<GroupModel[]> {
    return this._http.get<GroupModel[]>(`${environment.apiUrl}/group`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<GroupModel[]>()));
  }

  public getById(groupId: number): Observable<GroupModel> {
    return this._http.get<GroupModel>(`${environment.apiUrl}/group/${groupId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<GroupModel>()));
  }

  public post(groupModel: GroupModel): Observable<GroupModel> {
    return this._http.post<GroupModel>(`${environment.apiUrl}/group/`, groupModel, {
      withCredentials: true
    }).pipe(catchError(this.handleError<GroupModel>()));
  }

  public put(groupId: number, groupModel: GroupModel): Observable<GroupModel> {
    return this._http.put<GroupModel>(`${environment.apiUrl}/group/${groupId}`, groupModel, {
      withCredentials: true
    }).pipe(catchError(this.handleError<GroupModel>()));
  }
}
