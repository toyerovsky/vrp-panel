import { CharacterModel } from './CharacterModel';
import { VehicleModel } from './VehicleModel';
import { BuildingModel } from './BuildingModel';

export class ItemModel {
    id: number;
    name: string;
    itemType: string;
    characterId: number;
    character: CharacterModel;
    buildingId: number;
    building: BuildingModel;
    vehicleId: number;
    vehicle: VehicleModel;
    tuningInVehicleId: number;
    tuningInVehicle: VehicleModel;
}
