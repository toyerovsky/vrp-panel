import { Component, OnInit } from '@angular/core';
import { CharacterModel } from '../../models/CharacterModel';
import { TrustedStyleService } from '../../service/trusted-style.service';

@Component({
  selector: 'app-player-groups',
  templateUrl: './player-groups.component.html',
  styleUrls: ['./player-groups.component.css']
})
export class PlayerGroupsComponent implements OnInit {

  public playerCharacters: CharacterModel[];
  constructor(
    private _style: TrustedStyleService
  ) { }

  ngOnInit() {
    
  }
}
