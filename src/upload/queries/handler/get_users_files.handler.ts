import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUsersFileQuery } from "../impl/get_users_file.query";
import { InjectRepository } from "@nestjs/typeorm";
import { UploadedFile, User } from "libs/models";
import { Repository } from "typeorm";

@QueryHandler(GetUsersFileQuery)
export class GetUsersFilesHandler implements IQueryHandler<GetUsersFileQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UploadedFile)
    private readonly fileRepo: Repository<UploadedFile>
  ) {}

  async execute(query: GetUsersFileQuery): Promise<User> {
    const { userId } = query;
    const usersFiles = this.userRepo
      .createQueryBuilder("user")
      .andWhere("user.id = :userId", { userId: userId })
      .leftJoinAndSelect("user.uploadedFiles", "uploadedFiles")
      .getOne();
    return usersFiles;
  }
}
