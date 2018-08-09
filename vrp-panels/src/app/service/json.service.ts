import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';

export interface SimpleSelectorElement {
  displayName: string;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class JsonService extends AbstractService {
    constructor(toastr: ToastrService, private _http: HttpClient) {
      super(toastr);
    }

    public getSkins(): Observable<SimpleSelectorElement[]> {
        return this._http.get<SimpleSelectorElement[]>('./assets/json/skins.json');
    }

    public getVehicles(): Observable<SimpleSelectorElement[]> {
      return this._http.get<SimpleSelectorElement[]>('./assets/json/vehicles.json');
  }
}