/// <reference types="multer" />
import { UploadFileDtoRequest } from "./dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { User } from "libs/models";
export declare class UploadController {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    uploadFile(uploadFileDto: UploadFileDtoRequest, file: Express.Multer.File, user: User): Promise<any>;
    getFiles(user: User): Promise<any>;
}
