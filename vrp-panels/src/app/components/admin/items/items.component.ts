import { EditItemComponent } from './elements/admin-edit-item/edit-item.component';
import { AdminAddItemComponent } from './elements/admin-add-item/admin-add-item.component';
import { ItemModel } from '../../../models/ItemModel';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'admin-items',
  templateUrl: './items.component.html',
  styleUrls: ['../admin-table.scss']
})
export class ItemsComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'name', 'itemType', 'owner'];
  private _dataSource = new MatTableDataSource<ItemModel>();
  private _lastItems: ItemModel[];
  private _dataReady: boolean;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _addItemDialog: MatDialog,
    private _editItemDialog: MatDialog,
    private _toastrService: ToastrService,
    private _itemService: ItemService
  ) {
  }

  ngOnInit() {
    this._itemService.getAll().subscribe(items => {
      if (items !== undefined) {
        this._lastItems = items || [];
        this._dataSource.data = this._lastItems;
      }
      this._dataReady = true;
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    });
  }

  addItemClickHandler() {
    const dialogRef = this._addItemDialog.open(AdminAddItemComponent, {
      maxWidth: '60vh'
    });

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
    this._itemService.getById(itemModel.id).subscribe(item => {
      Object.assign(itemModel, item);
    }); // we do this to get all of the properties

    const dialogRef = this._editItemDialog.open(EditItemComponent, {
      data: itemModel,
      maxWidth: '60vh'
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
