import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { AccountModel } from '../../models/AccountModel';
import { GroupModel } from '../../models/GroupModel';
import GroupRightsHelper from '../../helpers/GroupRankHelper';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {
  private _accountModel: AccountModel;
  private _manageableGroups: GroupModel[] = [];

  constructor(
    private _accountService: AccountService,
    private _cookie: CookieService) {
  }

  ngOnInit() {
    this._accountService.getById(this._accountService.currentUserId).subscribe(account => {
      this._accountModel = account;
      this._accountModel.characters.forEach(character => {
        character.workers.forEach(worker => {
          if (GroupRightsHelper.workerToRightsIncludeRankRights(worker).panel) {
            this._manageableGroups.push(worker.group);
          }
        });
      });
    });
  }

  private getRankColor(serverRank: string): string {
    if (serverRank.startsWith('Administrator rozgrywki')) {
      return '#2ECC71';
    } else if (serverRank.startsWith('Administrator techniczny')) {
      return '#9B59B6';
    } else if (serverRank.startsWith('Zarząd')) {
      return '#ff0000';
    } else if (serverRank.startsWith('Donator')) {
      return '#ebc11a';
    } else if (serverRank.startsWith('Support')) {
      return '#52aeff';
    }
  }

  public logOut(): void {
    this._accountService.logOut().subscribe();
    this._cookie.delete('AccountId');
  }

  public openMenu(): void{
    document.getElementsByTagName('aside')[0].classList.add('asideShowContent');
  }

  public closeMenu(): void{
    document.getElementsByTagName('aside')[0].classList.remove('asideShowContent');
  }
}
