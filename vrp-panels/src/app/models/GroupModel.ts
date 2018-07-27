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

export class GroupModel {
  id: number;
  name: string;
  groupType: string;
  gImg: SafeStyle;
  tag: string;
  dotation: number;
  maxPayday: number;
  money: number;
  color: string;
}
