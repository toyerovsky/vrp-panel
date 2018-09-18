import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map} from 'rxjs/operators';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';
import { VehicleModel } from '../models/VehicleModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends AbstractService {
  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getAllByCharacterId(characterId: number): Observable<VehicleModel[]> {
    return this._http.get<VehicleModel[]>(`${environment.apiUrl}/vehicle/character/${characterId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<VehicleModel[]>()));
  }

  public getAllByGroupId(groupId: number): Observable<VehicleModel[]> {
    return this._http.get<VehicleModel[]>(`${environment.apiUrl}/vehicle/group/${groupId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<VehicleModel[]>()));
  }

  public getById(vehicleId: number): Observable<VehicleModel> {
    return this._http.get<VehicleModel>(`${environment.apiUrl}/vehicle/${vehicleId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<VehicleModel>()));
  }

  public getAll(): Observable<VehicleModel[]> {
    return this._http.get<VehicleModel[]>(`${environment.apiUrl}/vehicle/`, { withCredentials: true })
      .pipe(catchError(this.handleError<VehicleModel[]>()));
  }

  public post(vehicleModel: VehicleModel): Observable<VehicleModel> {
    return this._http.post<VehicleModel>(`${environment.apiUrl}/vehicle/`, vehicleModel, { withCredentials: true })
      .pipe(catchError(this.handleError<VehicleModel>()));
  }

  public put(vehicleId: number, vehicleModel: VehicleModel): Observable<VehicleModel> {
    return this._http.put<VehicleModel>(`${environment.apiUrl}/vehicle/${vehicleId}`, vehicleModel, { withCredentials: true })
      .pipe(catchError(this.handleError<VehicleModel>()));
  }

  public getByNumberPlate(numberPlate: string): Observable<VehicleModel> {
    return this._http.get<VehicleModel>(`${environment.apiUrl}/vehicle/numberplate/${numberPlate}`, { withCredentials: true })
      .pipe(catchError(this.handleError<VehicleModel>()));
  }

  public checkIfNumberPlateTaken(numberPlate: string): Observable<Boolean> {
    return this.getByNumberPlate(numberPlate)
      .pipe(
        map(vehicle => vehicle != null),
        catchError(this.handleError<Boolean>())
      );
  }
}
