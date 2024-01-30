import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadFileDtoRequest } from "./dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UploadFileCommand } from "./command/impl";
import { currentUser } from "decorators";
import { User } from "libs/models";
import { userGuard } from "middlewares";
import { GetUsersFileQuery } from "./queries/impl/get_users_file.query";

@ApiTags("file/")
@Controller("upload")
@UseInterceptors(ClassSerializerInterceptor)
export class UploadController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @UseInterceptors(FileInterceptor("file"))
  @Post()
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiOperation({
    description: "upload js or css file",
  })
  @UseGuards(userGuard)
  @ApiBearerAuth()
  async uploadFile(
    @Body() uploadFileDto: UploadFileDtoRequest,
    @UploadedFile() file: Express.Multer.File,
    @currentUser() user: User
  ) {
    return this.commandBus.execute(
      new UploadFileCommand(uploadFileDto, user.id, file)
    );
  }

  @Get()
  @ApiOperation({ description: "get users file" })
  @ApiBearerAuth()
  async getFiles(@currentUser() user: User) {
    return this.queryBus.execute(new GetUsersFileQuery(user.id));
  }
}
