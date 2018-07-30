import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GroupModel } from "../../../../models/GroupModel";
import { CharacterModel } from "../../../../models/CharacterModel";

 class TabWorker{
  character: CharacterModel;
  salary: number;
  permission: number;
  options: any;
}

@Component({
  selector: "app-player-group-details",
  templateUrl: "./player-group-details.component.html",
  styleUrls: ["./player-group-details.component.css"]
})
export class PlayerGroupDetailsComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<PlayerGroupDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public model: GroupModel
  ) {}

  displayedColumns: string[] = ['Postać', 'Pensja', 'Uprawnienia', 'Opcje'];
  dataSource: TabWorker[] = new Array<TabWorker>();
  ngOnInit() {
    this.model.workers.forEach(worker =>{
      this.dataSource.push({
        character:worker.character,
        salary: worker.salary,
        permission: worker.rights,
        options: ''

      });
    });
  }
  closeDialog(): void {
    this._dialogRef.close();
  }
}
