import { InjectRepository } from "@nestjs/typeorm";
import parseBearerToken from "parse-bearer-token";
import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { IToken } from "../helpers";
import { User } from "../libs/models";
import { Repository } from "typeorm";
import { CustomError, INVALID_TOKEN } from "../exceptions/exceptions";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token = undefined;
    try {
      token = parseBearerToken(req);
      if (token) {
        const verify = this.jwtService.verify(token);
        req.currentUser = verify as IToken;
        const { id } = verify as IToken;
        req.currentUser = verify as IToken;
        const user = await this.userRepository.findOne({
          where: { id: id },
        });
        if (!user) {
          throw new ForbiddenException();
        }
        req.user = user;
      }
    } catch {
      throw new CustomError(INVALID_TOKEN);
    }
    next();
  }
}
