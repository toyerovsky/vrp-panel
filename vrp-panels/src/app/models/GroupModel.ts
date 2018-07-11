import { SafeStyle } from "@angular/platform-browser";

export enum GroupTypes {
  Taxi,
  Bar,
  Club,
  Store,
  Crime,
  Workshop,
  Police,
  Hospital,
  News,
  CityHall
}

export interface GroupModel {
  id: number;
  name: string;
  type: GroupTypes;
  gImg: SafeStyle;
  member: string;
}

