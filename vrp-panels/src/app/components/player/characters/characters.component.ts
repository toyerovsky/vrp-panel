import { CharacterDetailsComponent } from './elements/character-details/character-details.component';
import { Component, OnInit } from '@angular/core';
import { CharacterModel } from '../../../models/CharacterModel';
import { WorkerModel } from '../../../models/WorkerModel';
import { PenaltyModel } from '../../../models/PenaltyModel';
import { MatDialog } from '@angular/material';
import { AccountService } from '../../../service/account.service';
import { CharacterService } from '../../../service/character.service';
import { AddCharacterComponent } from './elements/add-character/add-character.component';

@Component({
  selector: 'player-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['../player.scss', './characters.component.scss']
})
export class CharactersComponent implements OnInit {
  private _playerCharacters: CharacterModel[] = [];
  private _dataReady: Boolean;

  constructor(
    private _dialog: MatDialog,
    private _accountService: AccountService,
    private _characterService: CharacterService
  ) {
  }

  ngOnInit() {
    this._characterService.getAllByAccountId(this._accountService.currentUserId)
      .subscribe(characters => {
        this._playerCharacters = characters;
        this._dataReady = true;
      });
  }

  openDetails(character: CharacterModel): void {
    this._dialog.open(CharacterDetailsComponent, {
      data: character,
      width: '80vh',
      minHeight: '250px'
    });
  }

  addCharacterClickHandler() {
    const dialogRef = this._dialog.open(AddCharacterComponent, {
      width: '100vh'
    });

    dialogRef.afterClosed().subscribe(data => {

    });
  }
}
