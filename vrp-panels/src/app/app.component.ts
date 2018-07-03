import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _notification: ToastrService){}

  ngOnInit(){
    setTimeout(() => this._notification.error("Test","Tytuł test"));
  }
}
