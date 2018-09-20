import { Component, OnInit } from '@angular/core';
import { PenaltyService } from '../../../service/penalty.service';

@Component({
  selector: 'player-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss']
})
export class PenaltiesComponent implements OnInit {

  constructor(
    private _penaltyService: PenaltyService) {
  }

  ngOnInit() {
  }

}
