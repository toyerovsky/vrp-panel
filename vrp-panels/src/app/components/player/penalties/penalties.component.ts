import { PenaltyModel } from './../../../models/PenaltyModel';
import { Component, OnInit } from '@angular/core';
import { PenaltyService } from '../../../service/penalty.service';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'player-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss']
})
export class PenaltiesComponent implements OnInit {
  private _dataReady: boolean;
  private _playerPenalties: PenaltyModel[] = [];

  constructor(
    private _penaltyService: PenaltyService,
    private _accountService: AccountService) {
  }

  ngOnInit() {
    this._penaltyService.getAllByAccountId(this._accountService.currentUserId)
      .subscribe(penalties => {
        this._playerPenalties = penalties
        this._dataReady = true;
      });
  }
}
