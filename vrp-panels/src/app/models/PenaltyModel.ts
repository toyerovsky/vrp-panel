import { AccountModel } from './AccountModel';
import { CharacterModel } from './CharacterModel';

export class PenaltyModel {
  public creatorName: string;
  public date: Date | string;
  public expiryDate: Date | string;
  public reason: string;
  public penaltyType: string;
  public creator: AccountModel;
  public creatorId: AccountModel;
  public character: CharacterModel;
  public characterId?: number;
}
