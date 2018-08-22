import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../models/AccountModel';
import { ToastrService } from 'ngx-toastr';
import { PL_PAGINATOR_INTL } from '../../../const/MaterialConstants';
import { AdminEditAccountComponent } from './elements/admin-edit-account/admin-edit-account.component';
// dialogs


@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['../admin-table.scss']
})
export class AdminAccountsComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'forumUserName', 'email', 'serverRank', 'lastLogin'];
  private _dataSource = new MatTableDataSource<AccountModel>();
  private _lastAccounts: AccountModel[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _accountService: AccountService,
    private _editAccountDialog: MatDialog,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._accountService.getAll().subscribe(accounts => {
      if (accounts != undefined) {
        this._lastAccounts = accounts;
        this._dataSource.data = this._lastAccounts;
      }
    });
    this._dataSource.sort = this.sort;
    this._dataSource.paginator = this.paginator;
  }

  editAccountClickHandler(accountModel: AccountModel) {
    const dialogRef = this._editAccountDialog.open(AdminEditAccountComponent, {
      data: accountModel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this._accountService.put(result.id, result).subscribe(putResult => {
          this._toastrService.success(`Pomyślnie edytowano konto: ${result.forumUserName}`);
        });
      }
    });
  }

  searchHandler(filter: string) {
    this._dataSource.filter = filter.trim().toLowerCase();
  }
}
