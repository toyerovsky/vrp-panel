import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";
import { BuildingModel } from "../models/BuildingModel";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BuildingService extends AbstractService {
  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getAllByCharacterId(characterId: number): Observable<BuildingModel[]> {
    return this._http.get<BuildingModel[]>(`${environment.apiUrl}/building/character/${characterId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<BuildingModel[]>()));
  }

  public getAllByGroupId(groupId: number): Observable<BuildingModel[]> {
    return this._http.get<BuildingModel[]>(`${environment.apiUrl}/building/group/${groupId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<BuildingModel[]>()));
  }

  public getById(buildingId: number): Observable<BuildingModel> {
    return this._http.get<BuildingModel>(`${environment.apiUrl}/building/${buildingId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<BuildingModel>()));
  }

  public getAll(): Observable<BuildingModel[]> {
    return this._http.get<BuildingModel[]>(`${environment.apiUrl}/building/`, { withCredentials: true })
      .pipe(catchError(this.handleError<BuildingModel[]>()));
  }

  public post(buildingModel: BuildingModel): Observable<BuildingModel> {
    return this._http.post<BuildingModel>(`${environment.apiUrl}/building/`, buildingModel, { withCredentials: true })
      .pipe(catchError(this.handleError<BuildingModel>()));
  }

  public put(buildingId: number, buildingModel: BuildingModel): Observable<BuildingModel> {
    return this._http.put<BuildingModel>(`${environment.apiUrl}/building/${buildingId}`, buildingModel, { withCredentials: true })
      .pipe(catchError(this.handleError<BuildingModel>()));
  }
}