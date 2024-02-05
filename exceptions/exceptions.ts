import { HttpException, HttpStatus } from "@nestjs/common";

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
  description: "User Not Found",
};

export const USER_ALREADY_EXISTS: ICustomError = {
  status: HttpStatus.BAD_REQUEST,
  description: "user already exists",
};

export const INVALID_PASSWORD: ICustomError = {
  status: HttpStatus.BAD_REQUEST,
  description: "Incorrect Password",
};
export const MINIFICATION_FAILED: ICustomError = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "could not minify the file",
};

export const WRITE_FILE_ERROR: ICustomError = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "could not write the file",
};

export const INVALID_TOKEN: ICustomError = {
  status: HttpStatus.UNAUTHORIZED,
  description:
    "token is invalid, maybe you should delete the bearer you wrote in  the swagger ui part?",
};

export const INVALID_MIMETYPE: ICustomError = {
  status: HttpStatus.BAD_REQUEST,
  description: "unsupported mime type",
};
