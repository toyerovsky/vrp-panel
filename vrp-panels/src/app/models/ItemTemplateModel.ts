import { AccountModel } from './AccountModel';

export class ItemTemplateModel {
    id: number;
    name: string;
    itemType: string;
    firstParameter: number | null;
    secondParameter: number | null;
    thirdParameter: number | null;
    fourthParameter: number | null;
    creatorId: number;
    creator: AccountModel;
    creationTime: Date | string;
}