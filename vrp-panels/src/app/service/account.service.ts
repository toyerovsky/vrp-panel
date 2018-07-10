import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from '../../environments/environment';
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";
import md5 from 'md5';
import { AccountModel } from "../models/AccountModel";

@Injectable({ providedIn: 'root' })
export class AccountService extends AbstractService {
    public currentUserId: number;

    constructor(
        private toastr: ToastrService,
        private _http: HttpClient,
    ) {
        super(toastr);
    }

    public login(email: string, passwordHash: string): Observable<void> {
        return this._http.post<void>(`${environment.apiUrl}/account/login`, { email, passwordHash }, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    public getGravatarUrl(email: string): string {
        return `https://www.gravatar.com/avatar/${md5(email)}`;
    }

    public getById(id: number): Observable<AccountModel> {
        return this._http.get<AccountModel>(`${environment.apiUrl}/account/${id}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    public getAll(): Observable<AccountModel[]> {
        return this._http.get<AccountModel[]>(`${environment.apiUrl}/account/`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    public getByEmail(email: string): Observable<any> {
        return this._http.get<any>(`${environment.apiUrl}/account/email/${email}`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
}
