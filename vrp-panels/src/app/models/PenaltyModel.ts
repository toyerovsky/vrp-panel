import { AccountModel } from "./AccountModel";

export interface PenaltyModel {
    creatorName: string;
    date: Date | string;
    expiryDate: Date | string;
    reason: string;
    penaltyType: string;
    creator: AccountModel;
}