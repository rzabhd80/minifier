import { User } from '../models';

export interface IToken {
  id: string;
  email?: string;
  createdAt: Date;
}

export const generateUserToken = (user: User): IToken => ({
  id: user.id,
  createdAt: user.createdAt,
  email: user.email ? user.email : null,
});
