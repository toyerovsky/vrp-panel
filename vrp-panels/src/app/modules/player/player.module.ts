import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from '../../components/player/characters/characters.component';
import { CharacterDetailsComponent } from '../../components/player/characters/elements/character-details/character-details.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { PlayerNavigationComponent } from '../../components/player/player-navigation/player-navigation.component';
import { GroupsComponent } from '../../components/player/groups/groups.component';
import { PenaltiesComponent } from '../../components/player/penalties/penalties.component';
import { GroupDetailsComponent } from '../../components/player/groups/elements/group-details/group-details.component';
import { AddCharacterComponent } from '../../components/player/characters/elements/add-character/add-character.component';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  declarations: [
    CharactersComponent,
    CharacterDetailsComponent,
    PlayerNavigationComponent,
    GroupsComponent,
    PenaltiesComponent,
    GroupDetailsComponent,
    AddCharacterComponent
  ],
  entryComponents: [
    CharacterDetailsComponent,
    GroupDetailsComponent,
    AddCharacterComponent
  ]
})
export class PlayerModule {
}
