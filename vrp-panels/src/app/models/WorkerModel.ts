import { CharacterModel } from "./CharacterModel";
import { GroupModel } from "./GroupModel";

export interface WorkerModel {
  character: CharacterModel;
  group: GroupModel;
  id: number;
  rights: number;
  salary: number;
  dutyMinutes: number;
}
