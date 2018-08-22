import { CharacterModel } from './CharacterModel';
import { VehicleModel } from './VehicleModel';
import { BuildingModel } from './BuildingModel';

export class ItemModel {
  public id: number;
  public name: string;
  public itemType: string;
  public characterId?: number;
  public character: CharacterModel;
  public buildingId?: number;
  public building: BuildingModel;
  public vehicleId?: number;
  public vehicle: VehicleModel;
  public tuningInVehicleId?: number;
  public tuningInVehicle: VehicleModel;
  public firstParameter?: number;
  public secondParameter?: number;
  public thirdParameter?: number;
  public fourthParameter?: number;
}
