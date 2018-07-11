import { Component, OnInit } from '@angular/core';
import { CharacterModel } from '../../models/CharacterModel';
import { TrustedStyleService } from '../../service/trusted-style.service';
import { GroupModel, GroupTypes } from '../../models/GroupModel';
import { MatDialog } from '@angular/material';
import { PlayerCharacterDetailsComponent } from './elements/player-character-details/player-character-details.component';
import { AccountService } from '../../service/account.service';
import { CharacterService } from '../../service/character.service';
import { GroupService } from '../../service/group.service';
import { PenaltyModel } from '../../models/PenaltyModel';
import { PenaltyService } from '../../service/penalty.service';

@Component({
  selector: 'app-player-characters',
  templateUrl: './player-characters.component.html',
  styleUrls: ['./player-characters.component.css']
})
export class PlayerCharactersComponent implements OnInit {
  private _playerCharacters: CharacterModel[];
  private _playerGroups: GroupModel[];
  private _playerPenalties: PenaltyModel[];

  constructor(
    private _style: TrustedStyleService,
    private _characterDetailsDialog: MatDialog,
    private _accountService: AccountService,
    private _characterService: CharacterService,
    private _groupService: GroupService,
    private _penaltyService: PenaltyService
  ) { }

  ngOnInit() {
    this._characterService.getAllByAccountId(this._accountService.currentUserId).subscribe(characters => {
      this._playerCharacters = characters;
      this._playerCharacters.forEach(character => {
        this._groupService.getAllByCharacterId(character.id).subscribe(groups => {
          this._playerGroups.push(...groups);
        });
      });
    });
    this._penaltyService.getAllByAccountId(this._accountService.currentUserId).subscribe(penalties => {
      this._playerPenalties = penalties;
    });
  }

  openDetails(character: CharacterModel): void {
    const dialogRef = this._characterDetailsDialog.open(PlayerCharacterDetailsComponent, {
      data: character
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
