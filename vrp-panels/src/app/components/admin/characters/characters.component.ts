import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { CharacterService } from '../../../service/character.service';
import { CharacterModel } from '../../../models/CharacterModel';
import { AddCharacterComponent } from './elements/add-character/add-character.component';
import { ToastrService } from 'ngx-toastr';
import { EditCharacterComponent } from './elements/edit-character/edit-character.component';

@Component({
  selector: 'admin-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['../admin-table.scss']
})
export class CharactersComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'accountId', 'name', 'money', 'bank', 'gender', 'isAlive'];
  private _dataSource = new MatTableDataSource<CharacterModel>();
  private _lastCharacters: CharacterModel[];
  private _dataReady: boolean;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

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
        this._lastCharacters = characters || [];
        this._dataSource.data = this._lastCharacters;
      }
      this._dataReady = true;
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    });
  }

  addCharacterClickHandler() {
    const dialogRef = this._addCharacterDialog.open(AddCharacterComponent, {
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
    this._characterService.getById(characterModel.id).subscribe(character => {
      Object.assign(characterModel, character);
    }); // we do this to get all of the properties

    const dialogRef = this._editCharacterDialog.open(EditCharacterComponent, {
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
