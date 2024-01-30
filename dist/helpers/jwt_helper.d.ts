import { User } from "../libs/models";
export interface IToken {
    id: string;
    email?: string;
    createdAt: Date;
}
export declare const generateUserToken: (user: User) => IToken;
