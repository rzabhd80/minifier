/// <reference types="multer" />
import { UploadFileDto } from "libs/dto";
export declare class UploadFileCommand {
    readonly uploadFileDto: UploadFileDto;
    readonly userId: string;
    readonly file: Express.Multer.File;
    constructor(uploadFileDto: UploadFileDto, userId: string, file: Express.Multer.File);
}
