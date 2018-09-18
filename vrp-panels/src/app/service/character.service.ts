import { ImageModel } from './../models/ImageModel';
import { CharacterModel } from './../models/CharacterModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import AbstractService from './abstract.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CharacterService extends AbstractService {
  constructor(
    private _toastr: ToastrService,
    private _http: HttpClient,
    private _router: Router) {
    super(_toastr, _router);
  }

  public getAllByAccountId(accountId: number): Observable<CharacterModel[]> {
    return this._http.get<CharacterModel[]>(`${environment.apiUrl}/character/account/${accountId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<CharacterModel[]>()));
  }

  public getById(characterId: number): Observable<CharacterModel> {
    return this._http.get<CharacterModel>(`${environment.apiUrl}/character/${characterId}`, { withCredentials: true })
      .pipe(catchError(this.handleError<CharacterModel>()));
  }

  public getAll(): Observable<CharacterModel[]> {
    return this._http.get<CharacterModel[]>(`${environment.apiUrl}/character/`, { withCredentials: true })
      .pipe(catchError(this.handleError<CharacterModel[]>()));
  }

  public post(characterModel: CharacterModel): Observable<CharacterModel> {
    return this._http.post<CharacterModel>(`${environment.apiUrl}/character/`, characterModel, { withCredentials: true })
      .pipe(catchError(this.handleError<CharacterModel>()));
  }

  public put(characterId: number, characterModel: CharacterModel): Observable<CharacterModel> {
    return this._http.put<CharacterModel>(`${environment.apiUrl}/character/${characterId}`, characterModel, { withCredentials: true })
      .pipe(catchError(this.handleError<CharacterModel>()));
  }

  public uploadImage(characterId: number, imageModel: ImageModel): Observable<CharacterModel> {
    console.log(this.uploadImage);
    return this._http.put<CharacterModel>(`${environment.apiUrl}/character/image/${characterId}`, imageModel, { withCredentials: true })
      .pipe(catchError(this.handleError<CharacterModel>()));
  }
}
