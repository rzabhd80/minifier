import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/models';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { generateUserToken, verifyPassword } from 'helpers';
import { UserLoginCommand } from '../impl/user_login.command';
import {
  CustomError,
  INVALID_PASSWORD,
  USER_NOT_FOUND,
} from 'exceptions/exceptions';

@CommandHandler(UserLoginCommand)
export class UserLoginHandler implements ICommandHandler<UserLoginCommand> {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async execute(command: UserLoginCommand) {
    const { UserLoginDto } = command;
    const { email, password } = UserLoginDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new CustomError(USER_NOT_FOUND);
    const isPasswordVerified = await verifyPassword(user.password, password);
    if (!isPasswordVerified) throw new CustomError(INVALID_PASSWORD);
    const token = this.jwtService.sign(generateUserToken(user));
    return { user: user, token: token };
  }
}
