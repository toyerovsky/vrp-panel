import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { CharacterService } from '../../../service/character.service';
import { CharacterModel } from '../../../models/CharacterModel';
import { AdminAddCharacterComponent } from './elements/admin-add-character/admin-add-character.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-characters',
  templateUrl: './admin-characters.component.html',
  styleUrls: ['./admin-characters.component.css']
})
export class AdminCharactersComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'accountId', 'name', 'money', 'bank', 'gender', 'isAlive'];
  private _dataSource = new MatTableDataSource<CharacterModel>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _characterService: CharacterService,
    private _addCharacterDialog: MatDialog,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._characterService.getAll().subscribe(characters => {
      if (characters != undefined) {
        this._dataSource.data = characters;
      }
    });
    this._dataSource.sort = this.sort;
  }

  addCharacterClickHandler() {
    const dialogRef = this._addCharacterDialog.open(AdminAddCharacterComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let character: CharacterModel = result;
        let temp = this._dataSource.data;
        temp.push(character);
        this._dataSource = new MatTableDataSource<CharacterModel>(temp);
        this._dataSource.sort = this.sort;
        this._characterService.post(character).subscribe();
        this._toastrService.success(`Pomyślnie dodano postać ${character.name} ${character.surname}`);
      }
    });
  }
}
