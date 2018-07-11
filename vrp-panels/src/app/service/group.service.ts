import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";
import { GroupModel } from "../models/GroupModel";

@Injectable({ providedIn: 'root' })
export class GroupService extends AbstractService {
    constructor(
        toastr: ToastrService,
        private _http: HttpClient) {
        super(toastr);
    }

    public getAllByCharacterId(characterId: number): Observable<GroupModel[]> {
        return this._http.get<GroupModel[]>(`${environment.apiUrl}/group/character/${characterId}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
}