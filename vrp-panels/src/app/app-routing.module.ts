import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { PropertiesComponent } from './components/group-management/properties/properties.component';
import { StaffComponent } from './components/group-management/staff/staff.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PenaltiesComponent } from './components/admin/penalties/penalties.component';
import { ItemsComponent } from './components/admin/items/items.component';
import { LoginComponent } from './components/login/login.component';
import { AppRootComponent } from './components/app-root/app-root.component';
import { VehiclesComponent as GroupVehiclesComponent } from './components/group-management/vehicles/vehicles.component';
import { VehiclesComponent } from './components/admin/vehicles/vehicles.component';
import { GroupsComponent } from './components/admin/groups/groups.component';
import { AccountsComponent } from './components/admin/accounts/accounts.component';
import { BuildingsComponent } from './components/admin/buildings/buildings.component';
import { RanksComponent } from './components/group-management/ranks/ranks.component';
import { CharactersComponent as PlayerCharactersComponent } from './components/player/characters/characters.component';
import { CharactersComponent as AdminCharactersComponent } from './components/admin/characters/characters.component';
import { GroupInfoComponent } from './components/group-management/group-info/group-info.component';
import { PenaltiesComponent as PlayerPenaltiesComponent } from './components/player/penalties/penalties.component';
import { GroupsComponent as PlayerGroupsComponent} from './components/player/groups/groups.component';

const routes: Routes = [
  { path: '', redirectTo: 'player/characters', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AppRootComponent, children: [
      {
        path: 'groupmanagement/:id', children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: GroupInfoComponent },
          { path: 'staff', component: StaffComponent },
          { path: 'ranks', component: RanksComponent },
          { path: 'properties', component: PropertiesComponent },
          { path: 'vehicles', component: GroupVehiclesComponent },
        ]
      },
      {
        path: 'player', children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: PlayerCharactersComponent },
          { path: 'characters', component: PlayerCharactersComponent },
          { path: 'groups', component: PlayerGroupsComponent },
          { path: 'penalties', component: PlayerPenaltiesComponent }
        ]
      },
      {
        path: 'admin', children: [
          { path: 'characters', component: AdminCharactersComponent },
          { path: 'accounts', component: AccountsComponent },
          { path: 'groups', component: GroupsComponent },
          { path: 'vehicles', component: VehiclesComponent },
          { path: 'buildings', component: BuildingsComponent },
          { path: 'items', component: ItemsComponent },
          { path: 'penalties', component: PenaltiesComponent }
        ]
      },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'notfound', component: NotFoundComponent }
    ]
  },
  // ALWAYS AT THE END OF ROUTES
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
