import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UploadFileCommand } from "../impl/upload_file.commad";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UploadedFile } from "libs/models";
import { Repository } from "typeorm";
import { CustomError, MINIFICATION_FAILED, USER_NOT_FOUND } from "exceptions/exceptions";
import * as path from "path";
import * as fs from "fs";
import * as minifier from "minifier";

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UploadedFile)
    private readonly uploadedFileRepository: Repository<UploadedFile>,
  ) {
  }

  async createDirectoryIfNotExists(filePath: string) {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File, filePath: string) {
    await fs.promises.writeFile(filePath, file.buffer);
  }

  async minifyFile(filePath: string) {
    const startTime = Date.now();
    const memoryUsageBefore = process.memoryUsage().heapUsed;

    await minifier.minify(filePath);

    const endTime = Date.now();
    const memoryUsageAfter = process.memoryUsage().heapUsed;

    const duration = endTime - startTime;
    const memoryUsage = memoryUsageAfter - memoryUsageBefore;
    return { duration: duration, memoryUsage: memoryUsage };
  }

  async execute(command: UploadFileCommand) {
    const { userId, uploadFileDto, file } = command;
    const { minify } = uploadFileDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new CustomError(USER_NOT_FOUND);
    const username = user.email;
    const userFolderPath = path.join("/opt", username);
    const safeFileName = path.basename(file.originalname);
    try {
      await this.createDirectoryIfNotExists(userFolderPath);
      const filePath = path.join(userFolderPath, safeFileName);
      // Save the file
      await this.saveFile(file, filePath);
      const fileEntity = new UploadedFile();
      // Minify the file
      if (minify) {
        const { duration, memoryUsage } = await this.minifyFile(filePath);
        fileEntity.minificationDuration = duration;
        fileEntity.memoryUsageAfterMinification = memoryUsage;
      }
      fileEntity.filename = safeFileName;
      fileEntity.size = file.size;
      fileEntity.createdAt = new Date();
      await this.uploadedFileRepository.save(fileEntity);

      return { message: "File uploaded and minified successfully" };
    } catch (error) {
      console.error(error);
      throw new CustomError(MINIFICATION_FAILED);
    }
  }
}
