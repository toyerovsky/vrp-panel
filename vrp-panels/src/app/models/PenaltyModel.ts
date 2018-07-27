import { AccountModel } from "./AccountModel";
import { CharacterModel } from "./CharacterModel";

export interface PenaltyModel {
    creatorName: string;
    date: Date | string;
    expiryDate: Date | string;
    reason: string;
    penaltyType: string;
    creator: AccountModel;
    character: CharacterModel;
}
