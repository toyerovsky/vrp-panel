import { SafeStyle } from "@angular/platform-browser";

export interface CharacterModel {
  id: number;
  online: boolean;
  createTime: Date | string;
  lastLoginTime: Date | string;
  todayPlayedTime: string;
  playedTime: string;
  name: string;
  surname: string;
  model: string;
  money: number;
  bankAccountNumber: number | null;
  bankMoney: number | null;
  gender: boolean;
  bornDate: Date;
  hasIdCard: boolean;
  hasDrivingLicense: boolean;
  isAlive: boolean;
  health: number;
  lastPositionX: number;
  lastPositionY: number;
  lastPositionZ: number;
  lastRotationX: number;
  lastRotationY: number;
  lastRotationZ: number;
  minutesToRespawn: number;
  characterImage?: SafeStyle;
}