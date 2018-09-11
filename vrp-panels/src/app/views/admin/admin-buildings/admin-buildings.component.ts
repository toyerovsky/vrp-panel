import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { CharacterService } from '../../../service/character.service';
import { BuildingService } from '../../../service/building.service';
import { GroupService } from '../../../service/group.service';
import { AdminAddBuildingComponent } from './elements/admin-add-building/admin-add-building.component';
import { ToastrService } from 'ngx-toastr';
import { AdminEditBuildingComponent } from './elements/admin-edit-building/admin-edit-building.component';
import { BuildingModel } from '../../../models/BuildingModel';

@Component({
  selector: 'app-admin-buildings',
  templateUrl: './admin-buildings.component.html',
  styleUrls: ['../admin-table.scss']
})
export class AdminBuildingsComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'name', 'description', 'spawnPossible', 'owner'];
  private _dataSource = new MatTableDataSource<BuildingModel>();
  private _lastBuildings: BuildingModel[];
  private _dataReady: boolean;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _characterService: CharacterService,
    private _groupService: GroupService,
    private _buildingService: BuildingService,
    private _addBuildingDialog: MatDialog,
    private _editBuildingDialog: MatDialog,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._buildingService.getAll().subscribe(buildings => {
      if (buildings != undefined) {
        this._lastBuildings = buildings || [];
        this._dataSource.data = this._lastBuildings;
      }
      this._dataReady = true;
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    });
  }

  addBuildingClickHandler() {
    const dialogRef = this._addBuildingDialog.open(AdminAddBuildingComponent, {
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this._buildingService.post(result).subscribe(postResult => {
          this._lastBuildings.push(postResult);
          this._dataSource = new MatTableDataSource<BuildingModel>(this._lastBuildings);
          this._dataSource.sort = this.sort;
          this._toastrService.success(`Pomyślnie dodano budynek: ${postResult.name}`);
        });
      }
    });
  }

  editBuildingClickHandler(buildingModel: BuildingModel) {
    this._buildingService.getById(buildingModel.id).subscribe(building => {
      Object.assign(buildingModel, building);
    }); // we do this to get all of the properties

    const dialogRef = this._editBuildingDialog.open(AdminEditBuildingComponent, {
      data: buildingModel,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this._characterService.put(result.id, result).subscribe(putResult => {
          this._toastrService.success(`Pomyślnie edytowano budynek: ${result.name}`);
        });
      }
    });
  }

  searchHandler(filter: string) {
    this._dataSource.filter = filter.trim().toLowerCase();
  }
}
