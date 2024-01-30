import { IQueryHandler } from "@nestjs/cqrs";
import { GetUsersFileQuery } from "../impl/get_users_file.query";
import { UploadedFile, User } from "libs/models";
import { Repository } from "typeorm";
export declare class GetUsersFilesHandler implements IQueryHandler<GetUsersFileQuery> {
    private readonly userRepo;
    private readonly fileRepo;
    constructor(userRepo: Repository<User>, fileRepo: Repository<UploadedFile>);
    execute(query: GetUsersFileQuery): Promise<User>;
}
