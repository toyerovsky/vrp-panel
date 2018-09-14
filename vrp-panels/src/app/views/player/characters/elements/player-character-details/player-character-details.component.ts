import { CharacterService } from './../../../../../service/character.service';
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CharacterModel } from "../../../../../models/CharacterModel";
import { ImageModel } from '../../../../../models/ImageModel';

@Component({
  selector: "app-player-character-details",
  templateUrl: "./player-character-details.component.html",
  styleUrls: ["./player-character-details.component.scss"]
})
export class PlayerCharacterDetailsComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<PlayerCharacterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public character: CharacterModel,
    private _characterService: CharacterService
  ) { }

  ngOnInit() { }

  closeDialog(): void {
    this._dialogRef.close();
  }

  public onUpload: boolean = false;
  public imageChangedEvent: any = '';
  public croppedImage: string = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.onUpload = true;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  changeCharacterPicture(): void {
    let imageModel: ImageModel = {
      imageBase64: this.croppedImage.split(',')[1]
    };
    this._characterService.uploadImage(this.character.id, imageModel).subscribe();
    this.onUpload = false;
  }
}
