import { UploadFileDto } from "libs/dto";
export declare class UploadFileCommand {
    readonly uploadFileDto: UploadFileDto;
    readonly userId: string;
    readonly file: any;
    constructor(uploadFileDto: UploadFileDto, userId: string, file: any);
}
