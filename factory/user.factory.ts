import { User } from "libs/models";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class UserFactory {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async createUser(): Promise<User> {
    const user = new User();
    user.email = "parspack@parspack.com";
    user.password = "Twu5hKXXKZEQaJ";
    user.name = "parspack";
    return user.save();
  }
}
