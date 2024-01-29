import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadFileDtoRequest } from "./dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UploadFileCommand } from "./command/impl";
import { currentUser } from "decorators";
import { User } from "libs/models";
import { userGuard } from "middlewares";

@ApiTags("file/")
@Controller("upload")
@UseInterceptors(ClassSerializerInterceptor)
export class UploadController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @UseInterceptors(FileInterceptor("file"))
  @Post("/upload")
  @ApiOperation({ description: "upload js or css file" })
  @UseGuards(userGuard)
  async uploadFile(
    @Body() uploadFileDto: UploadFileDtoRequest,
    @UploadedFile() file: Express.Multer.File,
    @currentUser() user: User
  ) {
    return this.commandBus.execute(
      new UploadFileCommand(uploadFileDto, user.id, file)
    );
  }
}
