import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserLoginDtoRequest, UserSignupDtoRequest } from "./dto";
export declare class UserController {
    private readonly queryBus;
    private readonly commandBus;
    constructor(queryBus: QueryBus, commandBus: CommandBus);
    seedDatabase(): Promise<any>;
    signupUser(signUpUserDto: UserSignupDtoRequest): Promise<any>;
    loginUser(loginUserDto: UserLoginDtoRequest): Promise<any>;
}
