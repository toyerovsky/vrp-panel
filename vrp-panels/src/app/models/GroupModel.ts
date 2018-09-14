import { SafeStyle } from '@angular/platform-browser';
import { WorkerModel } from './WorkerModel';
import { CharacterModel } from './CharacterModel';
import { GroupRankModel } from './GroupRankModel';

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
  public id: number;
  public name: string;
  public groupType: string;
  public imageUploadUrl: string;
  public tag: string;
  public grant: number;
  public maxPayday: number;
  public money: number;
  public color: string;
  public workers: WorkerModel[];
  public groupRanks: GroupRankModel[];
  public bossCharacter: CharacterModel;
  public bossCharacterId: number;
  public defaultRankId: number;
  public defaultRank: GroupRankModel;
}
