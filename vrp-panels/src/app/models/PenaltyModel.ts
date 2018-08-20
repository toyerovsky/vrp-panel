import { AccountModel } from './AccountModel';
import { CharacterModel } from './CharacterModel';

export class PenaltyModel {
    creatorName: string;
    date: Date | string;
    expiryDate: Date | string;
    reason: string;
    penaltyType: string;
    creator: AccountModel;
    creatorId: AccountModel;
    character: CharacterModel;
    characterId: number;
}
