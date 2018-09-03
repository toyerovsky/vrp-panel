import { AdminEditPenaltyComponent } from './elements/admin-edit-penalty/admin-edit-penalty.component';
import { AdminAddPenaltyComponent } from './elements/admin-add-penalty/admin-add-penalty.component';
import { PenaltyService } from './../../../service/penalty.service';
import { PenaltyModel } from './../../../models/PenaltyModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-penalties',
  templateUrl: './admin-penalties.component.html',
  styleUrls: ['../admin-table.scss']
})
export class AdminPenaltiesComponent implements OnInit {
  private _displayedColumns: string[] = ['id', 'penaltyType', 'reason', 'date', 'expiryDate', 'creator', 'recipient'];
  private _dataSource = new MatTableDataSource<PenaltyModel>();
  private _lastPenalties: PenaltyModel[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _penaltyService: PenaltyService,
    private _addPenaltyDialog: MatDialog,
    private _editPenaltyDialog: MatDialog,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._penaltyService.getAll().subscribe(vehicles => {
      if (vehicles !== undefined) {
        this._lastPenalties = vehicles;
        this._dataSource.data = this._lastPenalties;
      }
    });
    this._dataSource.sort = this.sort;
    this._dataSource.paginator = this.paginator;
  }

  addPenaltyClickHandler() {
    const dialogRef = this._addPenaltyDialog.open(AdminAddPenaltyComponent, {
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._penaltyService.post(result).subscribe(postResult => {
          this._lastPenalties.push(postResult);
          this._dataSource = new MatTableDataSource<PenaltyModel>(this._lastPenalties);
          this._dataSource.sort = this.sort;
          this._toastrService.success(`Pomyślnie dodano karę: ${postResult.penaltyType}`);
        });
      }
    });
  }

  editPenaltyClickHandler(penaltyModel: PenaltyModel) {
    this._penaltyService.getById(penaltyModel.id).subscribe(penalty => {
      Object.assign(penaltyModel, penalty);
    }); // we do this to get all of the properties

    const dialogRef = this._editPenaltyDialog.open(AdminEditPenaltyComponent, {
      data: penaltyModel,
      maxWidth: '60vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._penaltyService.put(result.id, result).subscribe(putResult => {
          this._toastrService.success(`Pomyślnie edytowano karę: ${result.penaltyType}`);
        });
      }
    });
  }

  searchHandler(filter: string) {
    this._dataSource.filter = filter.trim().toLowerCase();
  }
}