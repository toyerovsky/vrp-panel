import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CharacterModel } from "../../../../models/CharacterModel";

@Component({
  selector: "app-player-character-details",
  templateUrl: "./player-character-details.component.html",
  styleUrls: ["./player-character-details.component.css"]
})
export class PlayerCharacterDetailsComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<PlayerCharacterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public model: CharacterModel
  ) {}

  ngOnInit() {}

  closeDialog(): void {
    this._dialogRef.close();
  }

  imageChangedEvent: any = "";
  croppedImage: any = "";
  characterImage: any =
    "http://csris.edu.kg/wp-content/uploads/2017/12/default-avatar.png";
  onUpload: boolean = false;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.onUpload = true;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  changeCharacterPicture(): void {
    this.characterImage = this.croppedImage;
    this.onUpload = false;
  }
}
