import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "./user/user.module";
import { UploadModule } from "./upload/upload.module";
import { CurrentUserMiddleware } from "../middlewares";
import { MulterModule } from "@nestjs/platform-express";
import { MimeTypeMiddleware } from "../middlewares/upload_file_middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "db",
      port: 5432,
      username: "reza",
      password: "reza",
      database: "minification",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
    UserModule,
    UploadModule,
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
