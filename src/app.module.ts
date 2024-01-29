import * as dotenv from "dotenv";

dotenv.config();
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "./user/user.module";
import { UploadModule } from "./upload/upload.module";
import { CurrentUserMiddleware, userGuard } from "../middlewares";
import { MulterModule } from "@nestjs/platform-express";
import { MimeTypeMiddleware } from "../middlewares/upload_file_middleware";
import * as process from "process";
import { entities } from "../libs/models";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      username: process.env.DATABASE_USER || "reza",
      password: process.env.DATABASE_PASSWORD || "reza",
      database: process.env.DATABASE_HOST || "minification",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
    UserModule,
    UploadModule,
    TypeOrmModule.forFeature(entities),
    MulterModule.register({ dest: "/opt" }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*");
    consumer.apply(MimeTypeMiddleware).forRoutes("*");
  }
}
