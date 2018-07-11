import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";
import { CharacterModel } from "../models/CharacterModel";

@Injectable({ providedIn: 'root' })
export class CharacterService extends AbstractService {
    constructor(
        toastr: ToastrService,
        private _http: HttpClient) {
        super(toastr);
    }

    public getAllByAccountId(accountId: number): Observable<CharacterModel[]> {
        return this._http.get<CharacterModel[]>(`${environment.apiUrl}/character/account/${accountId}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
}