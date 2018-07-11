// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
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
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './views/navigation/navigation.component';
import { PlayerGroupsComponent } from './views/player-groups/player-groups.component';
import { PlayerCharactersComponent } from './views/player-characters/player-characters.component';
import { CharacterService } from './service/character.service';
import { AccountService } from './service/account.service';
import { CookieService } from 'ngx-cookie-service';
import { AppRootComponent } from './views/app-root/app-root.component';
import { PlayerCharacterDetailsComponent } from './views/player-characters/elements/player-character-details/player-character-details.component';
import { GroupService } from './service/group.service';
import { AdminCharactersComponent } from './views/admin/admin-characters/admin-characters.component';
import { CdkTableModule } from '@angular/cdk/table';
import { AdminAddCharacterComponent } from './views/admin/admin-characters/elements/admin-add-character/admin-add-character.component';

// services

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
    AdminAddCharacterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,

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
  entryComponents: [PlayerCharacterDetailsComponent, AdminAddCharacterComponent],
  providers: [AccountService, CharacterService, CookieService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
