import { CharacterModel } from '../models/CharacterModel';
import { VehicleModel } from '../models/VehicleModel';
import { BuildingModel } from '../models/BuildingModel';

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
