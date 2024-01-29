import { UserSignupDto } from 'libs/dto';

export class UserSignupCommand {
  constructor(public readonly UserSignupDto: UserSignupDto) {}
}
