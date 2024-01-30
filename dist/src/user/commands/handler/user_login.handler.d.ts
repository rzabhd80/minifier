import { ICommandHandler } from "@nestjs/cqrs";
import { User } from "libs/models";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { UserLoginCommand } from "../impl/user_login.command";
export declare class UserLoginHandler implements ICommandHandler<UserLoginCommand> {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    execute(command: UserLoginCommand): Promise<{
        user: User;
        token: string;
    }>;
}
