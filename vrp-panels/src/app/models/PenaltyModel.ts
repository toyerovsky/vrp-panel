import { AccountModel } from './AccountModel';
import { CharacterModel } from './CharacterModel';

export class PenaltyModel {
  id: number;
  date: Date | string;
  expiryDate: Date | string;
  penaltyType: string;
  reason: string;
  creatorId: number;
  creator: AccountModel;
  characterId: number;
  character: CharacterModel;
  accountId: number;
  account: AccountModel;
  deactivatorId: number;
  deactivator: AccountModel;
}