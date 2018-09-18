import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from '../../components/player/characters/characters.component';
import { CharacterDetailsComponent } from '../../components/player/characters/elements/character-details/character-details.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../material/material.module';

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
    CharacterDetailsComponent
  ],
  entryComponents: [
    CharacterDetailsComponent,
  ]
})
export class PlayerModule {
}
