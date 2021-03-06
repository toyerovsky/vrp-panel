import { EditItemTemplateComponent } from './elements/edit-item-template/edit-item-template.component';
import { AddItemTemplateComponent } from './elements/add-item-template/add-item-template.component';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ItemTemplateModel } from '../../../models/ItemTemplateModel';
import { ItemTemplateService } from '../../../service/item-template.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-item-templates',
  templateUrl: './item-templates.component.html',
  styleUrls: ['../admin-table.scss']
})
export class ItemTemplatesComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'name', 'itemType', 'creator'];
  private _dataSource = new MatTableDataSource<ItemTemplateModel>();
  private _lastItems: ItemTemplateModel[];
  private _dataReady: boolean;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(
    private _addItemTemplateDialog: MatDialog,
    private _editItemTemplateDialog: MatDialog,
    private _toastrService: ToastrService,
    private _itemTemplateService: ItemTemplateService
  ) {
  }

  ngOnInit() {
    this._itemTemplateService.getAll().subscribe(items => {
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
    const dialogRef = this._addItemTemplateDialog.open(AddItemTemplateComponent, {
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._itemTemplateService.post(result).subscribe(postResult => {
          this._lastItems.push(postResult);
          this._dataSource = new MatTableDataSource<ItemTemplateModel>(this._lastItems);
          this._dataSource.sort = this.sort;
          this._toastrService.success(`Pomyślnie dodano wzór przedmiotu: ${postResult.name}`);
        });
      }
    });
  }

  editItemClickHandler(itemTemplateModel: ItemTemplateModel) {
    this._itemTemplateService.getById(itemTemplateModel.id).subscribe(item => {
      Object.assign(itemTemplateModel, item);
    }); // we do this to get all of the properties

    const dialogRef = this._editItemTemplateDialog.open(EditItemTemplateComponent, {
      data: itemTemplateModel,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._itemTemplateService.put(result.id, result).subscribe(putResult => {
          this._toastrService.success(`Pomyślnie edytowano wzór przedmiotu: ${result.name}`);
        });
      }
    });
  }

  searchHandler(filter: string) {
    this._dataSource.filter = filter.trim().toLowerCase();
  }
}
