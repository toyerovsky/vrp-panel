// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { ImageCropperModule } from 'ngx-image-cropper';
import {
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatTreeModule,
  MatButtonModule,
  MatCardModule,
  MatBadgeModule,
  MatMenuModule,
  MatToolbarModule,
  MatDialogModule,
  MatTabsModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatOptionModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule,
  MatSnackBarModule
} from '@angular/material';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NavigationComponent } from './views/navigation/navigation.component';
import { PlayerGroupsComponent } from './views/player-groups/player-groups.component';
import { PlayerCharactersComponent } from './views/player-characters/player-characters.component';
import { AppRootComponent } from './views/app-root/app-root.component';
import { PlayerCharacterDetailsComponent } from './views/player-characters/elements/player-character-details/player-character-details.component';
import { AdminCharactersComponent } from './views/admin/admin-characters/admin-characters.component';
import { AdminAddCharacterComponent } from './views/admin/admin-characters/elements/admin-add-character/admin-add-character.component';
import { AdminEditCharacterComponent } from './views/admin/admin-characters/elements/admin-edit-character/admin-edit-character.component';
import { PlayerGroupDetailsComponent } from './views/player-characters/elements/player-group-details/player-group-details.component';
import { AdminAccountsComponent } from './views/admin/admin-accounts/admin-accounts.component';
import { AdminEditAccountComponent } from './views/admin/admin-accounts/elements/admin-edit-account/admin-edit-account.component';
import { AdminVehiclesComponent } from './views/admin/admin-vehicles/admin-vehicles.component';
import { AdminAddVehicleComponent } from './views/admin/admin-vehicles/elements/admin-add-vehicle/admin-add-vehicle.component';
import { AdminEditVehicleComponent } from './views/admin/admin-vehicles/elements/admin-edit-vehicle/admin-edit-vehicle.component';
import { AdminAddGroupComponent } from './views/admin/admin-groups/elements/admin-add-group/admin-add-group.component';
import { AdminEditGroupComponent } from './views/admin/admin-groups/elements/admin-edit-group/admin-edit-group.component';
import { AdminGroupsComponent } from './views/admin/admin-groups/admin-groups.component';
import { TicketsComponent } from './views/tickets/tickets.component';
import { AdminBuildingsComponent } from './views/admin/admin-buildings/admin-buildings.component';
import { AdminAddBuildingComponent } from './views/admin/admin-buildings/elements/admin-add-building/admin-add-building.component';
import { AdminEditBuildingComponent } from './views/admin/admin-buildings/elements/admin-edit-building/admin-edit-building.component';
import { AdminItemsComponent } from './views/admin/admin-items/admin-items.component';
import { AdminAddItemComponent } from './views/admin/admin-items/elements/admin-add-item/admin-add-item.component';
import { AdminEditItemComponent } from './views/admin/admin-items/elements/admin-edit-item/admin-edit-item.component';
import { AdminPenaltiesComponent } from './views/admin/admin-penalties/admin-penalties.component';
import { AdminAddPenaltyComponent } from './views/admin/admin-penalties/elements/admin-add-penalty/admin-add-penalty.component';
import { AdminEditPenaltyComponent } from './views/admin/admin-penalties/elements/admin-edit-penalty/admin-edit-penalty.component';
import { AdminItemTemplatesComponent } from './views/admin/admin-item-templates/admin-item-templates.component';
import { ForbiddenComponent } from './views/forbidden/forbidden.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AdminAddItemTemplateComponent } from './views/admin/admin-item-templates/elements/admin-add-item-template/admin-add-item-template.component';
import { AdminEditItemTemplateComponent } from './views/admin/admin-item-templates/elements/admin-edit-item-template/admin-edit-item-template.component';
import { StaffComponent } from './views/group-management/staff/staff.component';
import { StaffEditWorkerComponent } from './views/group-management/staff/elements/edition/staff-edit-worker.component';
import { StaffEditMultipleWorkersComponent } from './views/group-management/staff/elements/edition/staff-edit-multiple-workers.component';
import { ActionBottomSheetComponent } from './views/group-management/staff/elements/action-bottom-sheet/action-bottom-sheet.component';

// modules
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData, CommonModule } from '@angular/common';

// services
import { CharacterService } from './service/character.service';
import { AccountService } from './service/account.service';
import { CookieService } from 'ngx-cookie-service';
import { GroupService } from './service/group.service';
import { VehicleService } from './service/vehicle.service';
import { BuildingService } from './service/building.service';
import { PenaltyService } from './service/penalty.service';
import { TicketService } from './service/ticket.service';

// misc
import localePl from '@angular/common/locales/pl';
import { getPolishPaginatorIntl } from './utils/PolishPaginator';
import { MatPaginatorIntl } from '@angular/material';
import { RanksComponent } from './views/group-management/ranks/ranks.component';
import { RanksAddRankComponent } from './views/group-management/ranks/elements/ranks-add-rank/ranks-add-rank.component';
import { RanksEditRankComponent } from './views/group-management/ranks/elements/ranks-edit-rank/ranks-edit-rank.component';
import { PropertiesComponent } from './views/group-management/properties/properties.component';
import { VehiclesComponent } from './views/group-management/vehicles/vehicles.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    PlayerGroupsComponent,
    AppRootComponent,
    PlayerCharactersComponent,
    PlayerCharacterDetailsComponent,
    AdminCharactersComponent,
    AdminAddCharacterComponent,
    AdminEditCharacterComponent,
    PlayerGroupDetailsComponent,
    AdminAccountsComponent,
    AdminEditAccountComponent,
    AdminVehiclesComponent,
    AdminAddVehicleComponent,
    AdminEditVehicleComponent,
    PlayerGroupDetailsComponent,
    AdminGroupsComponent,
    AdminAddGroupComponent,
    AdminEditGroupComponent,
    TicketsComponent,
    AdminBuildingsComponent,
    AdminAddBuildingComponent,
    AdminEditBuildingComponent,
    AdminItemsComponent,
    AdminAddItemComponent,
    AdminEditItemComponent,
    AdminPenaltiesComponent,
    AdminAddPenaltyComponent,
    AdminEditPenaltyComponent,
    AdminItemTemplatesComponent,
    ForbiddenComponent,
    NotFoundComponent,
    AdminAddItemTemplateComponent,
    AdminEditItemTemplateComponent,
    StaffComponent,
    StaffEditWorkerComponent,
    ActionBottomSheetComponent,
    StaffEditMultipleWorkersComponent,
    RanksComponent,
    RanksAddRankComponent,
    RanksEditRankComponent,
    PropertiesComponent,
    VehiclesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ImageCropperModule,
    CommonModule,
    // angular material modules
    MatIconModule,
    MatInputModule,
    MatTreeModule,
    MatSidenavModule,
    CdkTreeModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatSnackBarModule
  ],
  entryComponents: [
    PlayerCharacterDetailsComponent,
    PlayerGroupDetailsComponent,

    // admin panel modals
    AdminAddCharacterComponent,
    AdminEditCharacterComponent,
    AdminEditAccountComponent,
    AdminAddVehicleComponent,
    AdminEditVehicleComponent,
    AdminAddGroupComponent,
    AdminEditGroupComponent,
    AdminAddBuildingComponent,
    AdminEditBuildingComponent,
    AdminAddItemComponent,
    AdminEditItemComponent,
    AdminAddPenaltyComponent,
    AdminEditPenaltyComponent,

    // group management modals
    StaffEditWorkerComponent,
    StaffEditMultipleWorkersComponent,
    ActionBottomSheetComponent,
    RanksAddRankComponent,
    RanksEditRankComponent
  ],
  providers: [
    // services
    AccountService,
    CharacterService,
    CookieService,
    GroupService,
    VehicleService,
    BuildingService,
    PenaltyService,
    TicketService,

    { provide: LOCALE_ID, useValue: "pl" },
    { provide: MatPaginatorIntl, useValue: getPolishPaginatorIntl() },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
