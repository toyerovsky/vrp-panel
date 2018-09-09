import { WorkerRightsModel } from '../models/WorkerRightsModel';
import { WorkerModel } from "../models/WorkerModel";

export default class GroupRightsHelper {

  public static getDepositWithdrawMoney(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 1) == 1;
  }

  public static getDepositWithdrawMoneyValue(right: WorkerRightsModel) : number {
    return right.depositWithdrawMoney ? 1 : 0;
  }

  public static getRecruitment(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 2) == 2;
  }

  public static getRecruitmentValue(right: WorkerRightsModel) : number {
    return right.recruitment ? 2 : 0;
  }

  public static getOrders(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 4) == 4;
  }

  public static getOrdersValue(right: WorkerRightsModel) : number {
    return right.orders ? 4 : 0;
  }

  public static getDoors(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 8) == 8;
  }

  public static getDoorsValue(right: WorkerRightsModel) : number {
    return right.doors ? 8 : 0;
  }

  public static getChat(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 16) == 16;
  }

  public static getChatValue(right: WorkerRightsModel) : number {
    return right.chat ? 16 : 0;
  }

  public static getOffers(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 32) == 32;
  }

  public static getOffersValue(right: WorkerRightsModel) : number {
    return right.offers ? 32 : 0;
  }

  public static getFirst(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 64) == 64;
  }

  public static getFirstValue(right: WorkerRightsModel) : number {
    return right.first ? 64 : 0;
  }

  public static getSecond(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 128) == 128;
  }

  public static getSecondValue(right: WorkerRightsModel) : number {
    return right.second ? 128 : 0;
  }

  public static getThird(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 256) == 256;
  }

  public static getThirdValue(right: WorkerRightsModel) : number {
    return right.third ? 256 : 0;
  }

  public static getFourth(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 512) == 512;
  }

  public static getFourthValue(right: WorkerRightsModel) : number {
    return right.fourth ? 512 : 0;
  }

  public static getFifth(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 1024) == 1024;
  }

  public static getFifthValue(right: WorkerRightsModel) : number {
    return right.fifth ? 1024 : 0;
  }

  public static getSixth(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 2048) == 2048;
  }

  public static getSixthValue(right: WorkerRightsModel) : number {
    return right.sixth ? 2048 : 0;
  }

  public static getSeventh(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 4096) == 4096;
  }

  public static getSeventhValue(right: WorkerRightsModel) : number {
    return right.seventh ? 4096 : 0;
  }

  public static getEight(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 8192) == 8192;
  }

  public static getEightValue(right: WorkerRightsModel) : number {
    return right.eight ? 8192 : 0;
  }

  public static getNinth(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 16384) == 16384;
  }

  public static getNinthValue(right: WorkerRightsModel) : number {
    return right.ninth ? 16384 : 0;
  }

  public static getRights(workerModel: WorkerModel): WorkerRightsModel {
    return {
      depositWithdrawMoney: this.getDepositWithdrawMoney(workerModel),
      recruitment: this.getRecruitment(workerModel),
      orders: this.getOrders(workerModel),
      doors: this.getDoors(workerModel),
      chat: this.getChat(workerModel),
      offers: this.getOffers(workerModel),
      first: this.getFirst(workerModel),
      second: this.getSecond(workerModel),
      third: this.getThird(workerModel),
      fourth: this.getFourth(workerModel),
      fifth: this.getFifth(workerModel),
      sixth: this.getSixth(workerModel),
      seventh: this.getSeventh(workerModel),
      eight: this.getEight(workerModel),
      ninth: this.getNinth(workerModel)
    };
  }

  public static calculateRights(rights: WorkerRightsModel) : number {
    return this.getDepositWithdrawMoneyValue(rights) |
      this.getRecruitmentValue(rights) |
      this.getOrdersValue(rights) |
      this.getDoorsValue(rights) |
      this.getChatValue(rights) |
      this.getOffersValue(rights) |
      this.getFirstValue(rights) |
      this.getSecondValue(rights) |
      this.getThirdValue(rights) |
      this.getFourthValue(rights) |
      this.getFifthValue(rights) |
      this.getSixthValue(rights) |
      this.getSeventhValue(rights) |
      this.getEightValue(rights) |
      this.getNinthValue(rights);
  }
}