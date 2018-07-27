import { CharacterModel } from "./CharacterModel";
import { GroupModel } from "./GroupModel";

export interface WorkerModel {
  character: CharacterModel;
  group: GroupModel;
  id: number;
  rights: string;
  salary: number;
  dutyMinutes: number;
}
