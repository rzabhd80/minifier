import { ICommandHandler } from "@nestjs/cqrs";
import { UserSignupCommand } from "../impl/user_signup.command";
import { User } from "libs/models";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class UserSignupHandler implements ICommandHandler<UserSignupCommand> {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    execute(command: UserSignupCommand): Promise<{
        user: User;
        token: string;
    }>;
}
