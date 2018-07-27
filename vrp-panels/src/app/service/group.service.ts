import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";
import { GroupModel } from "../models/GroupModel";
import { WorkerModel } from "../models/WorkerModel";

@Injectable({ providedIn: 'root' })
export class GroupService extends AbstractService {
    constructor(
        toastr: ToastrService,
        private _http: HttpClient) {
        super(toastr);
    }

    public getAllByAccountId(accountId: number): Observable<WorkerModel[]> {
        return this._http.get<WorkerModel[]>(`${environment.apiUrl}/group/account/${accountId}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
}
