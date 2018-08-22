import { GroupModel } from './GroupModel';
import { CharacterModel } from './CharacterModel';

export class VehicleModel {
  public id: number;
  public numberPlate: string;
  public numberPlateStyle: number;
  public name: string;
  public vehicleHash: string;
  public health: number;
  public milage: number;
  public fuel: number;
  public fuelTank: number;
  public fuelConsumption: number;
  public character: CharacterModel;
  public characterId?: number;
  public group: GroupModel;
  public groupId?: number;
}
