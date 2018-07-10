export class AccountModel {
    id: number;
    name: string;
    forumUserId: number;
    email: string;
    primaryForumGroup: number;
    secondaryForumGroups: string;
    socialClub: string;
    lastLogin: Date | string;
    passwordSalt: string;
}