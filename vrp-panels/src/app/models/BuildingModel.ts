import { CharacterModel } from "./CharacterModel";
import { GroupModel } from './GroupModel'

export class BuildingModel {
    id: number;
    name: string;
    description: string;
    character: CharacterModel;
    characterId: number;
    group: GroupModel;
    groupId: number;
}