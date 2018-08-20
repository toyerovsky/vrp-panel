import { AdminEditBuildingComponent } from './../admin-buildings/elements/admin-edit-building/admin-edit-building.component';
import { AdminAddItemComponent } from './elements/admin-add-item/admin-add-item.component';
import { ItemModel } from './../../../models/ItemModel';
import { PL_PAGINATOR_INTL } from './../../../const/MaterialConstants';
import { ToastrService } from 'ngx-toastr';
import { BuildingService } from './../../../service/building.service';
import { VehicleService } from './../../../service/vehicle.service';
import { CharacterService } from './../../../service/character.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['../admin-table.scss']
})
export class AdminItemsComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'name', 'itemType', 'owner'];
  private _dataSource = new MatTableDataSource<ItemModel>();
  private _lastItems: ItemModel[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _addBuildingDialog: MatDialog,
    private _editBuildingDialog: MatDialog,
    private _toastrService: ToastrService,
    private _itemService: ItemService
  ) {
  }

  ngOnInit() {
    this._itemService.getAll().subscribe(items => {
      if (items !== undefined) {
        this._lastItems = items;
        this._dataSource.data = this._lastItems;
      }
    });
    this._dataSource.sort = this.sort;
    this.paginator._intl.firstPageLabel = PL_PAGINATOR_INTL.firstPageLabel;
    this.paginator._intl.itemsPerPageLabel = PL_PAGINATOR_INTL.itemsPerPageLabel;
    this.paginator._intl.lastPageLabel = PL_PAGINATOR_INTL.lastPageLabel;
    this.paginator._intl.nextPageLabel = PL_PAGINATOR_INTL.nextPageLabel;
    this.paginator._intl.previousPageLabel = PL_PAGINATOR_INTL.previousPageLabel;
    this._dataSource.paginator = this.paginator;
  }

  addItemClickHandler() {
    const dialogRef = this._addBuildingDialog.open(AdminAddItemComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._itemService.post(result).subscribe(postResult => {
          this._lastItems.push(postResult);
          this._dataSource = new MatTableDataSource<ItemModel>(this._lastItems);
          this._dataSource.sort = this.sort;
          this._toastrService.success(`Pomyślnie dodano przedmiot: ${postResult.name}`);
        });
      }
    });
  }

  editItemClickHandler(itemModel: ItemModel) {
    const dialogRef = this._editBuildingDialog.open(AdminEditBuildingComponent, {
      data: itemModel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._itemService.put(result.id, result).subscribe(putResult => {
          this._toastrService.success(`Pomyślnie edytowano przedmiot: ${result.name}`);
        });
      }
    });
  }

  searchHandler(filter: string) {
    this._dataSource.filter = filter.trim().toLowerCase();
  }
}
