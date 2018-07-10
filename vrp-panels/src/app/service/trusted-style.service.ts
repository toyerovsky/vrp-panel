import { Injectable } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TrustedStyleService {

  constructor(private _sanitizer: DomSanitizer) { }

  makeTrustedUrlBg(imageUrl: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${imageUrl})`);
  }
}
