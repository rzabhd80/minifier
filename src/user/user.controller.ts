import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserLoginDtoRequest, UserSignupDtoRequest } from "./dto";
import { UserSignupCommand } from "./commands/impl/user_signup.command";
import { UserLoginCommand } from "./commands/impl/user_login.command";
import { SeederFactoryCommand } from "./commands/impl/seeder_factory.command";

@ApiTags("/user")
@Controller("user")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Post("/seed")
  @ApiOperation({
    description:
      "seeds database with factory, created user will be parspack@parspack.com",
  })
  async seedDatabase() {
    return this.commandBus.execute(new SeederFactoryCommand());
  }
  @Post("/signup")
  @ApiOperation({ description: "signup user" })
  async signupUser(@Body() signUpUserDto: UserSignupDtoRequest) {
    return this.commandBus.execute(new UserSignupCommand(signUpUserDto));
  }

  @Post("/login")
  @ApiOperation({ description: "login user" })
  async loginUser(@Body() loginUserDto: UserLoginDtoRequest) {
    return this.commandBus.execute(new UserLoginCommand(loginUserDto));
  }
}
