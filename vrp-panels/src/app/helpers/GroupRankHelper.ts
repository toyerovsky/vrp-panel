import { WorkerRightsModel } from './../models/WorkerRightsModel';
import { WorkerModel } from './../models/WorkerModel';
import { GroupRankModel } from './../models/GroupRankModel';

export default class GroupRightsHelper {

  private static getDepositWithdrawMoney(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 1) == 1;
  }

  private static getDepositWithdrawMoneyFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 1) == 1;
  }

  private static getDepositWithdrawMoneyValue(rank: WorkerRightsModel): number {
    return rank.depositWithdrawMoney ? 1 : 0;
  }

  private static getRecruitment(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 2) == 2;
  }

  private static getRecruitmentFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 2) == 2;
  }

  private static getRecruitmentValue(right: WorkerRightsModel): number {
    return right.recruitment ? 2 : 0;
  }

  private static getOrders(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 4) == 4;
  }

  private static getOrdersFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 4) == 4;
  }

  private static getOrdersValue(right: WorkerRightsModel): number {
    return right.orders ? 4 : 0;
  }

  private static getDoors(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 8) == 8;
  }

  private static getDoorsFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 8) == 8;
  }

  private static getDoorsValue(right: WorkerRightsModel): number {
    return right.doors ? 8 : 0;
  }

  private static getChat(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 16) == 16;
  }

  private static getChatFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 16) == 16;
  }

  private static getChatValue(right: WorkerRightsModel): number {
    return right.chat ? 16 : 0;
  }

  private static getOffers(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 32) == 32;
  }

  private static getOffersFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 32) == 32;
  }

  private static getOffersValue(right: WorkerRightsModel): number {
    return right.offers ? 32 : 0;
  }

  private static getFirst(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 64) == 64;
  }

  private static getFirstFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 64) == 64;
  }

  private static getFirstValue(right: WorkerRightsModel): number {
    return right.first ? 64 : 0;
  }

  private static getSecond(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 128) == 128;
  }

  private static getSecondFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 128) == 128;
  }

  private static getSecondValue(right: WorkerRightsModel): number {
    return right.second ? 128 : 0;
  }

  private static getThird(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 256) == 256;
  }

  private static getThirdFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 256) == 256;
  }
  private static getThirdValue(right: WorkerRightsModel): number {
    return right.third ? 256 : 0;
  }

  private static getFourth(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 512) == 512;
  }

  private static getFourthFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 512) == 512;
  }

  private static getFourthValue(right: WorkerRightsModel): number {
    return right.fourth ? 512 : 0;
  }

  private static getFifth(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 1024) == 1024;
  }

  private static getFifthFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 1024) == 1024;
  }

  private static getFifthValue(right: WorkerRightsModel): number {
    return right.fifth ? 1024 : 0;
  }

  private static getSixth(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 2048) == 2048;
  }

  private static getSixthFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 2048) == 2048;
  }

  private static getSixthValue(right: WorkerRightsModel): number {
    return right.sixth ? 2048 : 0;
  }

  private static getSeventh(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 4096) == 4096;
  }

  private static getSeventhValue(right: WorkerRightsModel): number {
    return right.seventh ? 4096 : 0;
  }

  private static getSeventhFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 4096) == 4096;
  }

  private static getEight(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 8192) == 8192;
  }

  private static getEightValue(right: WorkerRightsModel): number {
    return right.eight ? 8192 : 0;
  }

  private static getEightFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 8192) == 8192;
  }

  private static getNinth(workerModel: WorkerModel): boolean {
    return (workerModel.rights & 16384) == 16384;
  }

  private static getNinthValue(right: WorkerRightsModel): number {
    return right.ninth ? 16384 : 0;
  }

  private static getNinthFromRank(rankModel: GroupRankModel): boolean {
    return (rankModel.rights & 16384) == 16384;
  }

  public static workerToRights(workerModel: WorkerModel): WorkerRightsModel {
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

  public static workerToRightsIncludeRankRights(workerModel: WorkerModel): WorkerRightsModel {
    return {
      depositWithdrawMoney: this.getDepositWithdrawMoney(workerModel) || this.getDepositWithdrawMoneyFromRank(workerModel.groupRank),
      recruitment: this.getRecruitment(workerModel) || this.getRecruitmentFromRank(workerModel.groupRank),
      orders: this.getOrders(workerModel) || this.getOrdersFromRank(workerModel.groupRank),
      doors: this.getDoors(workerModel) || this.getDoorsFromRank(workerModel.groupRank),
      chat: this.getChat(workerModel) || this.getChatFromRank(workerModel.groupRank),
      offers: this.getOffers(workerModel) || this.getOffersFromRank(workerModel.groupRank),
      first: this.getFirst(workerModel) || this.getFirstFromRank(workerModel.groupRank),
      second: this.getSecond(workerModel) || this.getSecondFromRank(workerModel.groupRank),
      third: this.getThird(workerModel) || this.getThirdFromRank(workerModel.groupRank),
      fourth: this.getFourth(workerModel) || this.getFourthFromRank(workerModel.groupRank),
      fifth: this.getFifth(workerModel) || this.getFifthFromRank(workerModel.groupRank),
      sixth: this.getSixth(workerModel) || this.getSixthFromRank(workerModel.groupRank),
      seventh: this.getSeventh(workerModel) || this.getSeventhFromRank(workerModel.groupRank),
      eight: this.getEight(workerModel) || this.getEightFromRank(workerModel.groupRank),
      ninth: this.getNinth(workerModel) || this.getNinthFromRank(workerModel.groupRank)
    };
  }

  public static rankToRights(rankModel: GroupRankModel): WorkerRightsModel {
    return {
      depositWithdrawMoney: this.getDepositWithdrawMoneyFromRank(rankModel),
      recruitment: this.getRecruitmentFromRank(rankModel),
      orders: this.getOrdersFromRank(rankModel),
      doors: this.getDoorsFromRank(rankModel),
      chat: this.getChatFromRank(rankModel),
      offers: this.getOffersFromRank(rankModel),
      first: this.getFirstFromRank(rankModel),
      second: this.getSecondFromRank(rankModel),
      third: this.getThirdFromRank(rankModel),
      fourth: this.getFourthFromRank(rankModel),
      fifth: this.getFifthFromRank(rankModel),
      sixth: this.getSixthFromRank(rankModel),
      seventh: this.getSeventhFromRank(rankModel),
      eight: this.getEightFromRank(rankModel),
      ninth: this.getNinthFromRank(rankModel)
    };
  }

  public static calculateRights(rights: WorkerRightsModel): number {
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

  public static rightsToArray(rights: WorkerRightsModel): number[] {
    let rightsArray: number[] = [
      this.getDepositWithdrawMoneyValue(rights),
      this.getRecruitmentValue(rights),
      this.getOrdersValue(rights),
      this.getDoorsValue(rights),
      this.getChatValue(rights),
      this.getOffersValue(rights),
      this.getFirstValue(rights),
      this.getSecondValue(rights),
      this.getThirdValue(rights),
      this.getFourthValue(rights),
      this.getFifthValue(rights),
      this.getSixthValue(rights),
      this.getSeventhValue(rights),
      this.getEightValue(rights),
      this.getNinthValue(rights)
    ];
    return rightsArray.filter(right => right != 0);
  }

}