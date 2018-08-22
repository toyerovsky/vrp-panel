import { CharacterModel } from './CharacterModel';
import { GroupModel } from './GroupModel';

export class BuildingModel {
  public id: number;
  public name: string;
  public description: string;
  public spawnPossible: Boolean;
  public externalPickupPositionX: number;
  public externalPickupPositionY: number;
  public externalPickupPositionZ: number;
  public internalPickupPositionX: number;
  public internalPickupPositionY: number;
  public internalPickupPositionZ: number;
  public character: CharacterModel;
  public characterId?: number;
  public group: GroupModel;
  public groupId?: number;
}
