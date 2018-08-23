import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { CharacterService } from '../../../service/character.service';
import { CharacterModel } from '../../../models/CharacterModel';
import { AdminAddCharacterComponent } from './elements/admin-add-character/admin-add-character.component';
import { ToastrService } from 'ngx-toastr';
import { AdminEditCharacterComponent } from './elements/admin-edit-character/admin-edit-character.component';

@Component({
  selector: 'app-admin-characters',
  templateUrl: './admin-characters.component.html',
  styleUrls: ['../admin-table.scss']
})
export class AdminCharactersComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'accountId', 'name', 'money', 'bank', 'gender', 'isAlive'];
  private _dataSource = new MatTableDataSource<CharacterModel>();
  private _lastCharacters: CharacterModel[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _characterService: CharacterService,
    private _addCharacterDialog: MatDialog,
    private _editCharacterDialog: MatDialog,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._characterService.getAll().subscribe(characters => {
      if (characters != undefined) {
        this._lastCharacters = characters;
        this._dataSource.data = this._lastCharacters;
      }
    });
    this._dataSource.sort = this.sort;
    this._dataSource.paginator = this.paginator;
  }

  addCharacterClickHandler() {
    const dialogRef = this._addCharacterDialog.open(AdminAddCharacterComponent, {
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this._characterService.post(result).subscribe(postResult => {
          this._lastCharacters.push(postResult);
          this._dataSource = new MatTableDataSource<CharacterModel>(this._lastCharacters);
          this._dataSource.sort = this.sort;
          this._toastrService.success(`Pomyślnie dodano postać: ${postResult.name} ${postResult.surname}`);
        });
      }
    });
  }

  editCharacterClickHandler(characterModel: CharacterModel) {
    const dialogRef = this._editCharacterDialog.open(AdminEditCharacterComponent, {
      data: characterModel,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this._characterService.put(result.id, result).subscribe(putResult => {
          this._toastrService.success(`Pomyślnie edytowano postać: ${result.name} ${result.surname}`);
        });
      }
    });
  }

  searchHandler(filter: string) {
    this._dataSource.filter = filter.trim().toLowerCase();
  }
}
