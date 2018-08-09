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
import { registerLocaleData } from '@angular/common';
import { AdminEditCharacterComponent } from './views/admin/admin-characters/elements/admin-edit-character/admin-edit-character.component';
import { PlayerGroupDetailsComponent } from './views/player-characters/elements/player-group-details/player-group-details.component';
import { AdminAccountsComponent } from './views/admin/admin-accounts/admin-accounts.component';
import { AdminEditAccountComponent } from './views/admin/admin-accounts/elements/admin-edit-account/admin-edit-account.component';
import { AdminVehiclesComponent } from './views/admin/admin-vehicles/admin-vehicles.component';
import { AdminAddVehicleComponent } from './views/admin/admin-vehicles/elements/admin-add-vehicle/admin-add-vehicle.component';
import { AdminEditVehicleComponent } from './views/admin/admin-vehicles/elements/admin-edit-vehicle/admin-edit-vehicle.component';

// modules
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';

// services
import { CharacterService } from './service/character.service';
import { AccountService } from './service/account.service';
import { CookieService } from 'ngx-cookie-service';
import { GroupService } from './service/group.service';
import { VehicleService } from './service/vehicle.service';
import { JsonService } from './service/json.service';

// misc
import localePl from '@angular/common/locales/pl';


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
    MatAutocompleteModule
  ],
  entryComponents: [
    PlayerCharacterDetailsComponent,
    PlayerGroupDetailsComponent,

    // admin panel modals
    AdminAddCharacterComponent,
    AdminEditCharacterComponent,
    AdminEditAccountComponent,
    AdminAddVehicleComponent,
    AdminEditVehicleComponent 
  ],
  providers: [
    // services
    AccountService, 
    CharacterService, 
    CookieService, 
    GroupService, 
    VehicleService,
    JsonService,
    
    { provide: LOCALE_ID, useValue: "pl" },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
