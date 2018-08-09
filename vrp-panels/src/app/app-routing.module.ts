import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// components
import { PlayerGroupsComponent } from './views/player-groups/player-groups.component';
import { PlayerCharactersComponent } from './views/player-characters/player-characters.component';
import { LoginComponent } from './views/login/login.component';
import { AppRootComponent } from './views/app-root/app-root.component';
import { AdminCharactersComponent } from './views/admin/admin-characters/admin-characters.component';
import { AdminAccountsComponent } from './views/admin/admin-accounts/admin-accounts.component';


const routes: Routes = [
  { path: '', redirectTo: 'player/characters', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AppRootComponent, children: [
      {
        path: 'player', children: [
          { path: 'groups', component: PlayerGroupsComponent },
          { path: 'characters', component: PlayerCharactersComponent }
        ]
      },
      {
        path: 'admin', children: [
          { path: 'characters', component: AdminCharactersComponent },
          { path: 'accounts', component: AdminAccountsComponent }
        ]
      }
    ]
  },
  //ALWAYS AT THE END OF ROUTES
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
