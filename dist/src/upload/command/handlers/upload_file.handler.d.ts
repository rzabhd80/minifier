/// <reference types="multer" />
import { ICommandHandler } from "@nestjs/cqrs";
import { UploadFileCommand } from "../impl";
import { User, UploadedFile } from "libs/models";
import { Repository } from "typeorm";
export declare class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
    private readonly userRepository;
    private readonly uploadedFileRepository;
    constructor(userRepository: Repository<User>, uploadedFileRepository: Repository<UploadedFile>);
    createDirectoryIfNotExists(filePath: string): Promise<void>;
    saveFile(file: Express.Multer.File, filePath: string): Promise<void>;
    minify_js_file(filePath: string): Promise<void>;
    minify_css_file(filePath: string): Promise<void>;
    minifyFile(filePath: string, mimeTYpe: string): Promise<{
        duration: number;
        memoryUsage: number;
    }>;
    execute(command: UploadFileCommand): Promise<{
        message: string;
        file: UploadedFile;
    }>;
}
