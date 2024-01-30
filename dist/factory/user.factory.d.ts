import { User } from "libs/models";
import { Repository } from "typeorm";
export declare class UserFactory {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    createUser(): Promise<User>;
}
