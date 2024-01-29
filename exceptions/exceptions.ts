import { HttpException, HttpStatus } from '@nestjs/common';

export interface ICustomError {
  status: number;
  description: string;
}

export class CustomError extends HttpException {
  constructor({ description, status }: ICustomError) {
    super(description, status);
  }
}

export const USER_NOT_FOUND: ICustomError = {
  status: HttpStatus.NOT_FOUND,
  description: 'User Not Found',
};

export const INVALID_PASSWORD: ICustomError = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Incorrect Password',
};
