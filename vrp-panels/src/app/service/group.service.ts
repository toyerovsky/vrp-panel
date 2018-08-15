import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";
import { GroupModel } from "../models/GroupModel";
import { WorkerModel } from "../models/WorkerModel";

@Injectable({ providedIn: "root" })
export class GroupService extends AbstractService {
  constructor(toastr: ToastrService, private _http: HttpClient) {
    super(toastr);
  }

  public getAllByAccountId(accountId: number): Observable<WorkerModel[]> {
    return this._http.get<WorkerModel[]>(`${environment.apiUrl}/group/account/${accountId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError));
  }

  public getAll(): Observable<GroupModel[]> {
    return this._http.get<GroupModel[]>(`${environment.apiUrl}/group`, {
      withCredentials: true
    }).pipe(catchError(this.handleError));
  }

  public getById(groupId: number): Observable<GroupModel> {
    return this._http.get<GroupModel>(`${environment.apiUrl}/group/${groupId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError));
  }

  public post(groupModel: GroupModel): Observable<GroupModel> {
    return this._http.post<GroupModel>(`${environment.apiUrl}/group/`, {
      withCredentials: true
    }).pipe(catchError(this.handleError));
  }

  public put(groupModel: GroupModel, id: number): Observable<GroupModel> {
    return this._http.put<GroupModel>(`${environment.apiUrl}/group/${id}`, groupModel, {
      withCredentials: true
    }).pipe(catchError(this.handleError));
  }
}
