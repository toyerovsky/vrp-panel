import { WorkerModel } from './../models/WorkerModel';
import { Injectable } from '@angular/core';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService extends AbstractService {
  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getAllByGroupId(groupId: number): Observable<WorkerModel[]> {
    return this._http.get<WorkerModel[]>(`${environment.apiUrl}/worker/group/${groupId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<WorkerModel[]>()));
  }

  public getById(workerId: number): Observable<WorkerModel> {
    return this._http.get<WorkerModel>(`${environment.apiUrl}/worker/${workerId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<WorkerModel>()));
  }

  public getAll(): Observable<WorkerModel[]> {
    return this._http.get<WorkerModel[]>(`${environment.apiUrl}/worker/`, { withCredentials: true })
      .pipe(catchError(this.handleError<WorkerModel[]>()));
  }

  public post(vehicleModel: WorkerModel): Observable<WorkerModel> {
    return this._http.post<WorkerModel>(`${environment.apiUrl}/worker/`, vehicleModel, { withCredentials: true })
      .pipe(catchError(this.handleError<WorkerModel>()));
  }

  public put(workerId: number, workerModel: WorkerModel): Observable<WorkerModel> {
    return this._http.put<WorkerModel>(`${environment.apiUrl}/worker/${workerId}`, workerModel, { withCredentials: true })
      .pipe(catchError(this.handleError<WorkerModel>()));
  }

  public delete(workerId: number): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/worker/${workerId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<void>()));
  }
}
