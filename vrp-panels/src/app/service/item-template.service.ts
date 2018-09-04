import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import BaseService from './abstract.service';
import { catchError } from 'rxjs/operators';
import { ItemTemplateModel } from '../models/ItemTemplateModel';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemTemplateService extends BaseService {
  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getAll(): Observable<ItemTemplateModel[]> {
    return this._http.get<ItemTemplateModel[]>(`${environment.apiUrl}/itemtemplate`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemTemplateModel[]>()));
  }

  public getById(itemTemplateId: number): Observable<ItemTemplateModel> {
    return this._http.get<ItemTemplateModel>(`${environment.apiUrl}/itemtemplate/${itemTemplateId}`, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemTemplateModel>()));
  }

  public post(itemTemplateModel: ItemTemplateModel): Observable<ItemTemplateModel> {
    return this._http.post<ItemTemplateModel>(`${environment.apiUrl}/itemtemplate/`, itemTemplateModel, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemTemplateModel>()));
  }

  public put(itemTemplateModel: ItemTemplateModel, id: number): Observable<ItemTemplateModel> {
    return this._http.put<ItemTemplateModel>(`${environment.apiUrl}/itemtemplate/${id}`, itemTemplateModel, {
      withCredentials: true
    }).pipe(catchError(this.handleError<ItemTemplateModel>()));
  }
}
