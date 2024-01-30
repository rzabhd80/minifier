// files/dto/upload-file.dto.ts
import { IsBoolean, IsNotEmpty } from "class-validator";

export class UploadFileDto {
  @IsNotEmpty()
  @IsBoolean()
  minify: boolean;

  @IsNotEmpty()
  file: any;
}
