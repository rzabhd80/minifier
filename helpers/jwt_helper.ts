import { User } from '../models';

export interface IToken {
  userId: string;
  email?: string;
  createdAt: Date;
}

export const generateUserToken = (user: User): IToken => ({
  userId: user.id,
  createdAt: user.createdAt,
  email: user.email ? user.email : null,
});
