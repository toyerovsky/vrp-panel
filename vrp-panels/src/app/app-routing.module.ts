import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// components
import { PlayerGroupsComponent } from './player-groups/player-groups.component';
import { PlayerCharactersComponent } from './player-characters/player-characters.component';

const routes: Routes = [
  { path: '', redirectTo:'player/characters', pathMatch: 'full' },
  {
    path: 'player', children:
      [
        {path: 'groups', component: PlayerGroupsComponent},
        {path: 'characters', component: PlayerCharactersComponent}
      ]
  },
  //ALWAYS AT THE END OF ROUTES
  {path:'**', redirectTo:'/'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
