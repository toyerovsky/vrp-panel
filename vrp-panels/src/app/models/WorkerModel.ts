import { CharacterModel } from './CharacterModel';
import { GroupModel } from './GroupModel';
import { GroupRankModel } from './GroupRankModel';

export class WorkerModel {
  public id: number;
  public salary: number;
  public dutyMinutes: number;
  public rights: number;
  public groupId: number;
  public group: GroupModel;
  public characterId: number;
  public character: CharacterModel;
  public groupRankId: number;
  public groupRank: GroupRankModel;
}
