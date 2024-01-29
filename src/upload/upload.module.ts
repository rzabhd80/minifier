import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "libs/models";
import { uploadFileHandlers } from "./command/handlers";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(entities)],
  controllers: [UploadController],
  providers: [...uploadFileHandlers],
})
export class UploadModule {}
