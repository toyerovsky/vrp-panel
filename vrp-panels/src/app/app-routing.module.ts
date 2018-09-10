import { StaffComponent } from './views/group-management/staff/staff.component';
import { GroupManagementComponent } from './views/group-management/group-management.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ForbiddenComponent } from './views/forbidden/forbidden.component';
import { AdminPenaltiesComponent } from './views/admin/admin-penalties/admin-penalties.component';
import { AdminItemsComponent } from './views/admin/admin-items/admin-items.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// components
import { PlayerGroupsComponent } from './views/player-groups/player-groups.component';
import { PlayerCharactersComponent } from './views/player-characters/player-characters.component';
import { LoginComponent } from './views/login/login.component';
import { AppRootComponent } from './views/app-root/app-root.component';
import { AdminCharactersComponent } from './views/admin/admin-characters/admin-characters.component';
import { AdminVehiclesComponent } from './views/admin/admin-vehicles/admin-vehicles.component';
import { AdminGroupsComponent } from './views/admin/admin-groups/admin-groups.component';
import { AdminAccountsComponent } from './views/admin/admin-accounts/admin-accounts.component';
import { TicketsComponent } from './views/tickets/tickets.component';
import { AdminBuildingsComponent } from './views/admin/admin-buildings/admin-buildings.component';
import { RanksComponent } from './views/group-management/ranks/ranks.component';


const routes: Routes = [
  { path: '', redirectTo: 'player/characters', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AppRootComponent, children: [
      {
        path: 'groupmanagement/:id', children: [
          { path: '', redirectTo: 'staff', pathMatch: 'full' },
          { path: 'staff', component: StaffComponent },
          { path: 'ranks', component: RanksComponent }
        ]
      },
      {
        path: 'player', children: [
          { path: 'groups', component: PlayerGroupsComponent },
          { path: 'characters', component: PlayerCharactersComponent }
        ]
      },
      {
        path: 'admin', children: [
          { path: 'characters', component: AdminCharactersComponent },
          { path: 'accounts', component: AdminAccountsComponent },
          { path: 'groups', component: AdminGroupsComponent },
          { path: 'vehicles', component: AdminVehiclesComponent },
          { path: 'buildings', component: AdminBuildingsComponent },
          { path: 'items', component: AdminItemsComponent },
          { path: 'penalties', component: AdminPenaltiesComponent }
        ]
      },
      { path: 'tickets', component: TicketsComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'notfound', component: NotFoundComponent }
    ]
  },
  //ALWAYS AT THE END OF ROUTES
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
