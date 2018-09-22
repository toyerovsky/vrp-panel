// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatIconModule,
  MatInputModule, MatProgressSpinnerModule,
  MatTreeModule
} from '@angular/material';

// components
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ForbiddenComponent } from '../../components/forbidden/forbidden.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { AppRootComponent } from '../../components/app-root/app-root.component';

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
import { LOCALE_ID } from '@angular/core';
import { getPolishPaginatorIntl } from '../../utils/PolishPaginator';
import { MatPaginatorIntl } from '@angular/material';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [
    NavigationComponent,
    ForbiddenComponent,
    NotFoundComponent,
    AppRootComponent
  ],
  exports: [
    NavigationComponent,
    ForbiddenComponent,
    NotFoundComponent,
    AppRootComponent,
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
  ],
  bootstrap: [AppRootComponent]
})
export class AppRootModule {
}
