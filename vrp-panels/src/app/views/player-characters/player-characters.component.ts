import { Component, OnInit } from "@angular/core";
import { CharacterModel } from "../../models/CharacterModel";
import { TrustedStyleService } from "../../service/trusted-style.service";
import { GroupModel, GroupTypes } from "../../models/GroupModel";
import { MatDialog } from "@angular/material";
import { PlayerCharacterDetailsComponent } from "./elements/player-character-details/player-character-details.component";
import { AccountService } from "../../service/account.service";
import { CharacterService } from "../../service/character.service";
import { GroupService } from "../../service/group.service";
import { PenaltyModel } from "../../models/PenaltyModel";
import { PenaltyService } from "../../service/penalty.service";
import { group } from "../../../../node_modules/@angular/animations";
import { WorkerModel } from "../../models/WorkerModel";
import { PlayerGroupDetailsComponent } from "./elements/player-group-details/player-group-details.component";

@Component({
  selector: "app-player-characters",
  templateUrl: "./player-characters.component.html",
  styleUrls: ["./player-characters.component.css"]
})
export class PlayerCharactersComponent implements OnInit {
  private _playerCharacters: CharacterModel[];
  private _playerGroups: GroupModel[] = new Array<GroupModel>();
  private _playerWorkers: WorkerModel[];
  private _playerPenalties: PenaltyModel[];


  constructor(
    private _style: TrustedStyleService,
    private _dialog: MatDialog,
    private _accountService: AccountService,
    private _characterService: CharacterService,
    private _groupService: GroupService,
    private _penaltyService: PenaltyService
  ) {}

  ngOnInit() {
    this._characterService
      .getAllByAccountId(this._accountService.currentUserId)
      .subscribe(characters => {
        this._playerCharacters = characters;
      });
    this._groupService
      .getAllByAccountId(this._accountService.currentUserId)
      .subscribe(workers => {
        this._playerWorkers = workers;
        this._playerWorkers.forEach(worker => {
          this._playerGroups.push(worker.group);
        });
        console.log("[DEBUG] Player workers");
        console.log(workers);
        console.log("[DEBUG] Player groups");
        console.log(this._playerGroups);
      });
    this._penaltyService
      .getAllByAccountId(this._accountService.currentUserId)
      .subscribe(penalties => {
        this._playerPenalties = penalties;
        console.log("[DEBUG] Player penalties");
        console.log(penalties);
      });
  }

  openDetails(character: CharacterModel): void {
    const dialogRef = this._dialog.open(
      PlayerCharacterDetailsComponent,
      {
        data: character
      }
    );

    dialogRef.afterClosed().subscribe(result => {});
  }

  openGroupDetails(groupId: number): void{

    this._groupService.getById(groupId).subscribe(gr =>{

      const dialogRef = this._dialog.open(
        PlayerGroupDetailsComponent,
        {
          data: gr
        }
      );

      dialogRef.afterClosed().subscribe(result => {});
      console.log('Dialog debug: ');
      console.log(gr);
    })

  }
}
