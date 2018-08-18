import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from '../../environments/environment';
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";
import md5 from 'md5';
import { AccountModel } from "../models/AccountModel";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AccountService extends AbstractService {
  constructor(
    toastr: ToastrService,
    private _http: HttpClient,
    private _cookie: CookieService,
    private _router: Router,
  ) {
    super(toastr);
  }

  public get currentUserId(): number {
    if (!this._cookie.check('AccountId')) {
      this._router.navigate(['login']);
    }
    return parseInt(this._cookie.get('AccountId'));;
  }

  public set currentUserId(value: number) {
    this._cookie.set('AccountId', value.toString());
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

  public getByEmail(email: string): Observable<AccountModel> {
    return this._http.get<AccountModel>(`${environment.apiUrl}/account/email/${email}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  public put(id: number, accountModel: AccountModel): Observable<AccountModel> {
    return this._http.put<AccountModel>(`${environment.apiUrl}/account/${id}`, accountModel, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }
}
