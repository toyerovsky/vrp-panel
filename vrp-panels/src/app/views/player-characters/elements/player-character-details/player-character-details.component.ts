import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CharacterModel } from '../../../../models/CharacterModel';

@Component({
  selector: 'app-player-character-details',
  templateUrl: './player-character-details.component.html',
  styleUrls: ['./player-character-details.component.css']
})
export class PlayerCharacterDetailsComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<PlayerCharacterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public model: CharacterModel
  ) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

}
