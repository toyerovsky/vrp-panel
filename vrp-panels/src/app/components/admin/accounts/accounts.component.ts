import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../models/AccountModel';
import { ToastrService } from 'ngx-toastr';
import { EditAccountComponent } from './elements/edit-account/edit-account.component';

@Component({
  selector: 'admin-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['../admin-table.scss']
})
export class AccountsComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'forumUserName', 'email', 'serverRank', 'lastLogin'];
  private _dataSource = new MatTableDataSource<AccountModel>();
  private _dataReady: boolean;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _accountService: AccountService,
    private _editAccountDialog: MatDialog,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._accountService.getAll().subscribe(accounts => {
      if (accounts !== undefined) {
        this._dataSource.data = accounts;
      }
      this._dataReady = true;
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    });
  }

  editAccountClickHandler(accountModel: AccountModel) {
    this._accountService.getById(accountModel.id).subscribe(account => {
      Object.assign(accountModel, account);
    }); // we do this to get all of the properties

    const dialogRef = this._editAccountDialog.open(EditAccountComponent, {
      data: accountModel,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
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
