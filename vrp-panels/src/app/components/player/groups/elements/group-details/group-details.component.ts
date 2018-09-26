import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GroupModel } from '../../../../../models/GroupModel';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<GroupDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public groupModel: GroupModel
  ) {
  }

  ngOnInit() {
  }

}
