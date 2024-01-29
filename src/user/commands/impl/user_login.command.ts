import { UserLoginDto } from "libs/dto";

export class UserLoginCommand {
  constructor(public readonly UserLoginDto: UserLoginDto) {}
}
