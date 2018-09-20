// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRootModule } from './modules/app-root/app-root.module';
import { AdminModule } from './modules/admin/admin.module';
import { GroupManagementModule } from './modules/group-management/group-management.module';
import { PlayerModule } from './modules/player/player.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRootComponent } from './components/app-root/app-root.component';

import { registerLocaleData } from '@angular/common';

// services
import { AccountService } from './service/account.service';
import { CookieService } from 'ngx-cookie-service';

// misc
import localePl from '@angular/common/locales/pl';
import { PlayerNavigationComponent } from './components/player/player-navigation/player-navigation.component';
import { GroupsComponent } from './components/player/groups/groups.component';
import { PenaltiesComponent } from './components/player/penalties/penalties.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AppRootModule,
    AdminModule,
    GroupManagementModule,
    PlayerModule,
    MaterialModule,
  ],
  providers: [
    AccountService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
