import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

export interface EntityInfo {
  displayName: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class JsonService extends AbstractService {
  constructor(toastr: ToastrService, private _http: HttpClient) {
    super(toastr);
  }

  public getSkins(): Observable<EntityInfo[]> {
    return this._http.get<EntityInfo[]>('./assets/json/skins.json')
      .pipe(catchError(this.handleError));;
  }

  public getVehicles(): Observable<EntityInfo[]> {
    return this._http.get<EntityInfo[]>('./assets/json/vehicles.json')
      .pipe(catchError(this.handleError));;
  }
}