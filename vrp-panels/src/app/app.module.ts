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
    AdminEditCharacterComponent
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
    MatNativeDateModule

  ],
  entryComponents: [
    PlayerCharacterDetailsComponent,
    // admin panel modals
    AdminAddCharacterComponent,
    AdminEditCharacterComponent
  ],
  providers: [AccountService, CharacterService, CookieService, GroupService,
    { provide: LOCALE_ID, useValue: "pl" }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
