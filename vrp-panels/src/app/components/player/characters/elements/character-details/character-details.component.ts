import { CharacterService } from '../../../../../service/character.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CharacterModel } from '../../../../../models/CharacterModel';
import { ImageModel } from '../../../../../models/ImageModel';

@Component({
  selector: 'player-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<CharacterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public character: CharacterModel,
    private _characterService: CharacterService
  ) { }

  public onUpload = false;
  public imageChangedEvent: any = '';
  public croppedImage = '';

  ngOnInit() { }

  closeDialog(): void {
    this._dialogRef.close();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.onUpload = true;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  changeCharacterPicture(): void {
    const imageModel: ImageModel = {
      imageBase64: this.croppedImage.split(',')[1]
    };
    this._characterService.uploadImage(this.character.id, imageModel).subscribe();
    this.onUpload = false;
  }
}
