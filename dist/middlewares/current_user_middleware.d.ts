import { NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { IToken } from "../helpers";
import { User } from "../libs/models";
import { Repository } from "typeorm";
declare global {
    namespace Express {
        interface Request {
            currentUser?: IToken;
            user?: {
                id: string;
                email: string;
            };
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private jwtService;
    private readonly userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
