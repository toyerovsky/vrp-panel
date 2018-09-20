import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupModel } from '../../../models/GroupModel';
import { GroupService } from '../../../service/group.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent implements OnInit {
  private _groupId: number;
  private _group: GroupModel;
  private _dataReady: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _groupService: GroupService) {
  }

  ngOnInit() {
    this._route.parent.paramMap.subscribe(params => {
      this._groupId = +params.get('id');
      this._groupService.getById(this._groupId).subscribe(group => {
        if (group !== undefined) {
          this._group = group;
        }
        this._dataReady = true;
      });
    });
  }

}
