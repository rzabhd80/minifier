import { ApiProperty } from "@nestjs/swagger";
import { UploadFileDto } from "libs/dto";

export class UploadFileDtoRequest extends UploadFileDto {
  @ApiProperty()
  minify: boolean;
}
