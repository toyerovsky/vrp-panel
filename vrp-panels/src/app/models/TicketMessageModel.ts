import { AccountModel } from './AccountModel';
import { TicketModel } from './TicketModel';

export class TicketMessageModel {
  public id: number;
  public messageContent: string;
  public author: AccountModel;
  public authorId: number;
  public ticket: TicketModel;
  public ticketId: number;
}
