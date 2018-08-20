import { CharacterModel } from './CharacterModel';
import { GroupModel } from './GroupModel';

export class BuildingModel {
    id: number;
    name: string;
    description: string;
    spawnPossible: Boolean;
    externalPickupPositionX: number;
    externalPickupPositionY: number;
    externalPickupPositionZ: number;
    internalPickupPositionX: number;
    internalPickupPositionY: number;
    internalPickupPositionZ: number;
    character: CharacterModel;
    characterId: number;
    group: GroupModel;
    groupId: number;
}
