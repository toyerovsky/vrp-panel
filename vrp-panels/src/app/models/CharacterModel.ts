import { SafeStyle } from "@angular/platform-browser";

export interface CharacterModel{
  id: number;
  name: string;
  surname: string;
  onlineHours: number;
  isOnline: boolean;
  chImage?: SafeStyle;
}
