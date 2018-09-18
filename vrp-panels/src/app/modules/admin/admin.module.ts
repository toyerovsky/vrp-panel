// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

// components
import { AddCharacterComponent } from '../../components/admin/characters/elements/add-character/add-character.component';
import { EditCharacterComponent } from '../../components/admin/characters/elements/edit-character/edit-character.component';
import { EditAccountComponent } from '../../components/admin/accounts/elements/edit-account/edit-account.component';
import { AddVehicleComponent } from '../../components/admin/vehicles/elements/admin-add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from '../../components/admin/vehicles/elements/admin-edit-vehicle/edit-vehicle.component';
import { AddGroupComponent } from '../../components/admin/groups/elements/admin-add-group/add-group.component';
import { EditGroupComponent } from '../../components/admin/groups/elements/admin-edit-group/edit-group.component';
import { AddBuildingComponent } from '../../components/admin/buildings/elements/add-building/add-building.component';
import { EditBuildingComponent } from '../../components/admin/buildings/elements/edit-building/edit-building.component';
import { AdminAddItemComponent } from '../../components/admin/items/elements/admin-add-item/admin-add-item.component';
import { EditItemComponent } from '../../components/admin/items/elements/admin-edit-item/edit-item.component';
import { AdminAddPenaltyComponent } from '../../components/admin/penalties/elements/admin-add-penalty/admin-add-penalty.component';
import { AdminEditPenaltyComponent } from '../../components/admin/penalties/elements/admin-edit-penalty/admin-edit-penalty.component';
import { CharactersComponent } from '../../components/admin/characters/characters.component';
import { AccountsComponent } from '../../components/admin/accounts/accounts.component';
import { VehiclesComponent } from '../../components/admin/vehicles/vehicles.component';
import { GroupsComponent } from '../../components/admin/groups/groups.component';
import { BuildingsComponent } from '../../components/admin/buildings/buildings.component';
import { ItemsComponent } from '../../components/admin/items/items.component';
import { PenaltiesComponent } from '../../components/admin/penalties/penalties.component';
import { ItemTemplatesComponent } from '../../components/admin/item-templates/item-templates.component';
import { AddItemTemplateComponent } from '../../components/admin/item-templates/elements/add-item-template/add-item-template.component';
import { EditItemTemplateComponent } from '../../components/admin/item-templates/elements/edit-item-template/edit-item-template.component';

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
import { MatPaginatorIntl } from '@angular/material';
import { getPolishPaginatorIntl } from '../../utils/PolishPaginator';
import { LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    CharactersComponent,
    AccountsComponent,
    VehiclesComponent,
    GroupsComponent,
    BuildingsComponent,
    ItemsComponent,
    PenaltiesComponent,
    ItemTemplatesComponent,
  ],
  declarations: [
    CharactersComponent,
    AddCharacterComponent,
    EditCharacterComponent,
    AccountsComponent,
    EditAccountComponent,
    VehiclesComponent,
    AddVehicleComponent,
    EditVehicleComponent,
    GroupsComponent,
    AddGroupComponent,
    EditGroupComponent,
    BuildingsComponent,
    AddBuildingComponent,
    EditBuildingComponent,
    ItemsComponent,
    AdminAddItemComponent,
    EditItemComponent,
    PenaltiesComponent,
    AdminAddPenaltyComponent,
    AdminEditPenaltyComponent,
    ItemTemplatesComponent,
    AddItemTemplateComponent,
    EditItemTemplateComponent,
  ],
  entryComponents: [
    AddCharacterComponent,
    EditCharacterComponent,
    EditAccountComponent,
    AddVehicleComponent,
    EditVehicleComponent,
    AddGroupComponent,
    EditGroupComponent,
    AddBuildingComponent,
    EditBuildingComponent,
    AdminAddItemComponent,
    EditItemComponent,
    AdminAddPenaltyComponent,
    AdminEditPenaltyComponent,
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
export class AdminModule {
}
