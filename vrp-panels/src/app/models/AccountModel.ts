import { CharacterModel } from './CharacterModel';
export class AccountModel {
  public id: number;
  public forumUserName: string;
  public email: string;
  public serverRank: string;
  public lastLogin?: Date | string;
  public avatarUrl?: string;
  public passwordSalt?: string;
  public useGravatar?: boolean;
  public gravatarEmail?: string;
  public characters: CharacterModel[];
}
