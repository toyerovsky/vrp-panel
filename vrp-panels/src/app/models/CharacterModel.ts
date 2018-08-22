import { SafeStyle } from '@angular/platform-browser';
import { AccountModel } from './AccountModel';

export class CharacterModel {
  public id: number;
  public online: boolean;
  public createTime: Date | string;
  public lastLoginTime: Date | string;
  public todayPlayedTime: string;
  public playedTime: string;
  public name: string;
  public surname: string;
  public model: string;
  public money: number;
  public bankAccountNumber?: number;
  public bankMoney?: number;
  public gender: boolean;
  public bornDate: Date;
  public hasIdCard: boolean;
  public hasDrivingLicense: boolean;
  public isAlive: boolean;
  public health: number;
  public lastPositionX: number;
  public lastPositionY: number;
  public lastPositionZ: number;
  public lastRotationX: number;
  public lastRotationY: number;
  public lastRotationZ: number;
  public minutesToRespawn: number;
  public characterImage?: SafeStyle;
  public accountId?: number;
  public account: AccountModel;
}
