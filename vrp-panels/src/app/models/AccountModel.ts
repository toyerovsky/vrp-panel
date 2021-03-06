import { CharacterModel } from './CharacterModel';
import { PenaltyModel } from './PenaltyModel';
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
  public penalties: PenaltyModel[];
}
