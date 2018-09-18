// modules
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { StaffComponent } from '../../components/group-management/staff/staff.component';
import { EditWorkerComponent } from '../../components/group-management/staff/elements/edition/edit-worker.component';
import { ActionBottomSheetComponent } from '../../components/group-management/staff/elements/action-bottom-sheet/action-bottom-sheet.component';
import { EditMultipleWorkersComponent } from '../../components/group-management/staff/elements/edition/edit-multiple-workers.component';
import { RanksComponent } from '../../components/group-management/ranks/ranks.component';
import { RanksAddRankComponent } from '../../components/group-management/ranks/elements/ranks-add-rank/ranks-add-rank.component';
import { RanksEditRankComponent } from '../../components/group-management/ranks/elements/ranks-edit-rank/ranks-edit-rank.component';
import { PropertiesComponent } from '../../components/group-management/properties/properties.component';
import { VehiclesComponent } from '../../components/group-management/vehicles/vehicles.component';

// services
import { AccountService } from '../../service/account.service';
import { CharacterService } from '../../service/character.service';
import { CookieService } from 'ngx-cookie-service';
import { GroupService } from '../../service/group.service';
import { VehicleService } from '../../service/vehicle.service';
import { BuildingService } from '../../service/building.service';
import { PenaltyService } from '../../service/penalty.service';
import { TicketService } from '../../service/ticket.service';

// misc
import {
  MatPaginatorIntl
} from '@angular/material';
import { getPolishPaginatorIntl } from '../../utils/PolishPaginator';
import { LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    StaffComponent,
    RanksComponent,
    PropertiesComponent,
    VehiclesComponent
  ],
  declarations: [
    StaffComponent,
    EditWorkerComponent,
    ActionBottomSheetComponent,
    EditMultipleWorkersComponent,
    RanksComponent,
    RanksAddRankComponent,
    RanksEditRankComponent,
    PropertiesComponent,
    VehiclesComponent
  ],
  entryComponents: [
    EditWorkerComponent,
    EditMultipleWorkersComponent,
    ActionBottomSheetComponent,
    RanksAddRankComponent,
    RanksEditRankComponent
  ],
  providers: [
    AccountService,
    CharacterService,
    CookieService,
    GroupService,
    VehicleService,
    BuildingService,
    PenaltyService,
    TicketService,
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: MatPaginatorIntl, useValue: getPolishPaginatorIntl() },
  ]
})
export class GroupManagementModule {
}
