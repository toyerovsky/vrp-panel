import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";
import bcrypt = require("bcrypt");

@Injectable({ providedIn: 'root' })
export class AccountService extends AbstractService {
    constructor(
        private toastr: ToastrService,
        private _http: HttpClient) {
        super(toastr);
    }

    public login(email: string, passwordHash: string): Observable<void> {
        return this._http.post<void>(`${environment.apiUrl}/login`, { email, passwordHash }, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    public getAll() {

    }

    public getById(id: number) {

    }


}
