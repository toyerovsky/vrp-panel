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

    public getAll(): Observable<CharacterModel[]> {
        return this._http.get<CharacterModel[]>(`${environment.apiUrl}/character/`, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    public post(characterModel: CharacterModel): Observable<CharacterModel> {
        return this._http.post<CharacterModel>(`${environment.apiUrl}/character/`, characterModel, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }

    public put(characterId: number, characterModel: CharacterModel): Observable<CharacterModel> {
        return this._http.put<CharacterModel>(`${environment.apiUrl}/character/${characterId}`, characterModel, { withCredentials: true })
            .pipe(catchError(this.handleError));
    }
}