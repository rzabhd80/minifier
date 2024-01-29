import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "libs/models";
import { userHandlers } from "./commands/handler";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(entities),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [UserController],
  providers: [...userHandlers],
})
export class UserModule {}
