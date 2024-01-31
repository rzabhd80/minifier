import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "libs/models";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { generateHashPassword, generateUserToken } from "helpers";
import { SeederFactoryCommand } from "../impl/seeder_factory.command";
import { CustomError, USER_NOT_FOUND } from "exceptions/exceptions";

@CommandHandler(SeederFactoryCommand)
export class SeederFactoryHandler
  implements ICommandHandler<SeederFactoryCommand>
{
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async execute() {
    let user = await this.userRepo.findOne({
      where: { email: "parspack@parspack.com", name: "parspack" },
    });
    const hashed_password = await generateHashPassword("Twu5hKXXKZEQaJ");
    if (user) {
      const token = this.jwtService.sign(generateUserToken(user));
      return { user: user, token: token };
    } else {
      user = await this.userRepo
        .create({
          name: "parspack",
          email: "parspack@parspack.com",
          password: hashed_password,
        })
        .save();
    }
    const token = this.jwtService.sign(generateUserToken(user));
    return { user: user, token: token };
  }
}
