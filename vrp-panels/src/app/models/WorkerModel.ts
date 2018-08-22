import { CharacterModel } from './CharacterModel';
import { GroupModel } from './GroupModel';
import { GroupRankModel } from './GroupRankModel';

export class WorkerModel {
  public id: number;
  public rights: number;
  public salary: number;
  public dutyMinutes: number;
  public character: CharacterModel;
  public characterId: number;
  public group: GroupModel;
  public groupId: number;
  public groupRankId?: number;
  public groupRank: GroupRankModel;
}
