import { SafeStyle } from '@angular/platform-browser';
import { WorkerModel } from './WorkerModel';
import { CharacterModel } from './CharacterModel';

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
  workers: WorkerModel[];
  bossCharacter: CharacterModel;
  bossId: number;
}
