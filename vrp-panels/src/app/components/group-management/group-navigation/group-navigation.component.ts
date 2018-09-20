import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-navigation',
  templateUrl: './group-navigation.component.html',
  styleUrls: ['./group-navigation.component.scss']
})
export class GroupNavigationComponent implements OnInit {
  private _groupId: number;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.parent.paramMap.subscribe(params => {
      this._groupId = +params.get('id');
    });
  }

}
