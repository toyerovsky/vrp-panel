import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {
  private _groupId: number;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._groupId = +params.get('id');
    });
  }
}
