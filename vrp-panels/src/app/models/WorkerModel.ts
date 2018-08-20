import { CharacterModel } from './CharacterModel';
import { GroupModel } from './GroupModel';
import { GroupRankModel } from './GroupRankModel';

export class WorkerModel {
  id: number;
  rights: number;
  salary: number;
  dutyMinutes: number;
  character: CharacterModel;
  characterId: number;
  group: GroupModel;
  groupId: number;
  groupRankId: number;
  groupRank: GroupRankModel;
}
