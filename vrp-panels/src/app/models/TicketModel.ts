import { TicketMessageModel } from './TicketMessageModel';
import { AccountModel } from './AccountModel';

export enum TicketStatusType {
  Expectant,
  During,
  Closed
}

export enum TicketType {
  BugForum,
  BugGame,
  Fck,
  Fcj,
  Other
}
export class TicketModel {
  public id: number;
  public title: string;
  public type: string;
  public status: string;
  public messageContent: TicketMessageModel[];
  public involvedAccounts: AccountModel[];
  public involvedAdmins: AccountModel[];
}
