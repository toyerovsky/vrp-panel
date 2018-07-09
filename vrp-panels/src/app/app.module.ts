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
} from '@angular/material';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { PlayerGroupsComponent } from './player-groups/player-groups.component';
import { PlayerCharactersComponent } from './player-characters/player-characters.component';

// services

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    PlayerGroupsComponent,
    PlayerCharactersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,


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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
