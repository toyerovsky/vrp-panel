import { CharacterDetailsComponent } from './elements/character-details/character-details.component';
import { Component, OnInit } from '@angular/core';
import { CharacterModel } from '../../../models/CharacterModel';
import { WorkerModel } from '../../../models/WorkerModel';
import { PenaltyModel } from '../../../models/PenaltyModel';
import { MatDialog } from '@angular/material';
import { AccountService } from '../../../service/account.service';
import { CharacterService } from '../../../service/character.service';

@Component({
  selector: 'player-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  private _playerCharacters: CharacterModel[] = [];
  private _dataReady: Boolean;

  constructor(
    private _dialog: MatDialog,
    private _accountService: AccountService,
    private _characterService: CharacterService
  ) { }

  ngOnInit() {
    this._characterService.getAllByAccountId(this._accountService.currentUserId)
      .subscribe(characters => {
        this._playerCharacters = characters;
        this._dataReady = true;
      });
  }

  openDetails(character: CharacterModel): void {
    const dialogRef = this._dialog.open(CharacterDetailsComponent, {
      data: character,
      width: '70vh',
      minHeight: '250px'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }
}
