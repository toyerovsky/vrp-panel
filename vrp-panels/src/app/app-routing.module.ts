import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// components
import { PlayerGroupsComponent } from './player-groups/player-groups.component';
import { PlayerCharactersComponent } from './player-characters/player-characters.component';
import { LoginComponent } from './login/login.component';
import { AppRootComponent } from './app-root/app-root.component';

const routes: Routes = [
  { path: '', redirectTo: 'player/characters', pathMatch: 'full' },
  {
    path: '',
    component: AppRootComponent,
    children: [
      {
        path: 'player', children:
          [
            { path: 'groups', component: PlayerGroupsComponent },
            { path: 'characters', component: PlayerCharactersComponent }
          ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  // ALWAYS AT THE END OF ROUTES
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
