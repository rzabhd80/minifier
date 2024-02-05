import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserSignupCommand } from "../impl/user_signup.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "libs/models";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { generateHashPassword, generateUserToken } from "helpers";
import {
  CustomError,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from "../../../../exceptions/exceptions";

@CommandHandler(UserSignupCommand)
export class UserSignupHandler implements ICommandHandler<UserSignupCommand> {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async execute(command: UserSignupCommand) {
    const { UserSignupDto } = command;
    const { email, password, name } = UserSignupDto;
    const user_on_db = await this.userRepo.findOne({ where: { email: email } });
    if (user_on_db) throw new CustomError(USER_ALREADY_EXISTS);
    const hashed_password = await generateHashPassword(password);
    const user = this.userRepo.create({
      email,
      password: hashed_password,
      name,
    });
    await user.save();
    const token = this.jwtService.sign(generateUserToken(user));
    return { user: user, token: token };
  }
}
