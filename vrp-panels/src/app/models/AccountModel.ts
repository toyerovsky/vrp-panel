export class AccountModel {
    id: number;
    forumUserName: string;
    email: string;
    serverRank: string;
    lastLogin?: Date | string;
    avatarUrl?: string;
    passwordSalt?: string;
    useGravatar?: boolean;
    gravatarEmail?: string;
}
