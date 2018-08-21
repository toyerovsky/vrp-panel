import { AccountModel } from "./AccountModel";
import { TicketModel } from "./TicketModel";

export  class TicketMessageModel{
  public id: number;
  public messageContent: string;
  public author: AccountModel;
  public ticket: TicketModel;
}
