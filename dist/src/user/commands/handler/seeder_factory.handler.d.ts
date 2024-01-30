import { ICommandHandler } from "@nestjs/cqrs";
import { User } from "libs/models";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SeederFactoryCommand } from "../impl/seeder_factory.command";
export declare class SeederFactoryHandler implements ICommandHandler<SeederFactoryCommand> {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    execute(): Promise<{
        user: User;
        token: string;
    }>;
}
