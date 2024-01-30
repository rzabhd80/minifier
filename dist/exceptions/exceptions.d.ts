import { HttpException } from "@nestjs/common";
export interface ICustomError {
    status: number;
    description: string;
}
export declare class CustomError extends HttpException {
    constructor({ description, status }: ICustomError);
}
export declare const USER_NOT_FOUND: ICustomError;
export declare const INVALID_PASSWORD: ICustomError;
export declare const MINIFICATION_FAILED: ICustomError;
export declare const INVALID_TOKEN: ICustomError;
export declare const INVALID_MIMETYPE: ICustomError;
