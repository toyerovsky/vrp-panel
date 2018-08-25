import { ItemModel } from '../models/ItemModel';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import AbstractService from './abstract.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends AbstractService {
  constructor(toastr: ToastrService, private _http: HttpClient) {
    super(toastr);
  }

  public getAllByCharacterId(characterId: number): Observable<ItemModel[]> {
    return this._http.get<ItemModel[]>(`${environment.apiUrl}/item/character/${characterId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemModel[]>()));
  }

  public getAllByGroupId(groupId: number): Observable<ItemModel[]> {
    return this._http.get<ItemModel[]>(`${environment.apiUrl}/item/group/${groupId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemModel[]>()));
  }

  public getAllByVehicleId(vehicleId: number): Observable<ItemModel[]> {
    return this._http.get<ItemModel[]>(`${environment.apiUrl}/item/vehicle/${vehicleId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemModel[]>()));
  }

  public getAll(): Observable<ItemModel[]> {
    return this._http.get<ItemModel[]>(`${environment.apiUrl}/item`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemModel[]>()));
  }

  public getById(itemId: number): Observable<ItemModel> {
    return this._http.get<ItemModel>(`${environment.apiUrl}/item/${itemId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemModel>()));
  }

  public post(itemModel: ItemModel): Observable<ItemModel> {
    return this._http.post<ItemModel>(`${environment.apiUrl}/item/`, itemModel, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemModel>()));
  }

  public put(itemModel: ItemModel, id: number): Observable<ItemModel> {
    return this._http.put<ItemModel>(`${environment.apiUrl}/item/${id}`, itemModel, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemModel>()));
  }
}
