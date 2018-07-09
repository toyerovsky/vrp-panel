import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';
import { catchError } from "rxjs/operators";
import AbstractService from "./abstract.service";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class CharacterService extends AbstractService {
    constructor(
        private toastr: ToastrService,
        private _http: HttpClient) {
        super(toastr);
    }   
}