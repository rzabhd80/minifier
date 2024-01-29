import { UploadFileDto } from "libs/dto";

export class UploadFileCommand {
  constructor(
    public readonly uploadFileDto: UploadFileDto,
    public readonly userId: string,
    public readonly file: Express.Multer.File
  ) {}
}
