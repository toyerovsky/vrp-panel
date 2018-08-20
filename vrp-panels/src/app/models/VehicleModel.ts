import { GroupModel } from './GroupModel';
import { CharacterModel } from './CharacterModel';

export class VehicleModel {
    id: number;
    numberPlate: string;
    numberPlateStyle: number;
    name: string;
    vehicleHash: string;
    health: number;
    milage: number;
    fuel: number;
    fuelTank: number;
    fuelConsumption: number;
    character: CharacterModel;
    characterId: number;
    group: GroupModel;
    groupId: number;
}
