import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UploadFileCommand } from "../impl";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UploadedFile } from "libs/models";
import { Repository } from "typeorm";
import { minify } from "terser";
import {
  CustomError,
  INVALID_MIMETYPE,
  MINIFICATION_FAILED,
  USER_NOT_FOUND,
} from "exceptions/exceptions";
import * as path from "path";
import * as fs from "fs";
import CleanCSS from "clean-css";

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UploadedFile)
    private readonly uploadedFileRepository: Repository<UploadedFile>
  ) {}

  async createDirectoryIfNotExists(filePath: string) {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
      await fs.promises.mkdir(filePath, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File, filePath: string) {
    await fs.promises.writeFile(filePath, file.buffer);
  }

  /**
   *  reading the file in chunks to prevent buffer overflow
   * **/
  async minify_js_file(filePath: string) {
    try {
      const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
      let minifiedJs = "";
      readStream.on("data", async (chunk) => {
        const minificationResult = await minify(chunk.toString());
        if (minificationResult.code) {
          minifiedJs += minificationResult.code;
        }
      });
      readStream.on("end", async () => {
        await fs.promises.writeFile(filePath, minifiedJs, "utf-8");

        console.log(
          `Minification successful. Minified JavaScript written to: ${filePath}`
        );
      });

      // Event handler for errors
      readStream.on("error", (error) => {
        throw error;
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
  /**
   * reading the entire file in chunks so it would not cause memory overflow
   * **/
  async minify_css_file(filePath: string) {
    try {
      const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
      let minifiedCss = "";
      readStream.on("data", (chunk) => {
        minifiedCss += new CleanCSS().minify(chunk).styles;
      });
      readStream.on("end", async () => {
        await fs.promises.writeFile(filePath, minifiedCss, "utf-8");
        console.log(
          `Minification successful. Minified CSS written to: ${filePath}`
        );
      });
      readStream.on("error", () => {
        throw new CustomError(MINIFICATION_FAILED);
      });
    } catch (error) {
      throw new CustomError(MINIFICATION_FAILED);
    }
  }

  async minifyFile(filePath: string, mimeTYpe: string) {
    const startTime = Date.now();
    const memoryUsageBefore = process.memoryUsage().heapUsed;

    if (mimeTYpe === "javascript" || mimeTYpe === "x-javascript")
      await this.minify_js_file(filePath);
    if (mimeTYpe === "css") await this.minify_css_file(filePath);
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
    console.log(file.mimetype);
    const uploadedFileMime = file.mimetype.split("/")[1];
    console.log(uploadedFileMime);
    if (!["javascript", "css", "x-javascript"].includes(uploadedFileMime))
      throw new CustomError(INVALID_MIMETYPE);
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
        const { duration, memoryUsage } = await this.minifyFile(
          filePath,
          uploadedFileMime
        );
        fileEntity.minificationDuration = duration;
        fileEntity.memoryUsageAfterMinification = memoryUsage;
      }
      fileEntity.filename = safeFileName;
      fileEntity.size = file.size;
      fileEntity.createdAt = new Date();
      await this.uploadedFileRepository.save(fileEntity);

      return {
        message: "File uploaded and minified successfully",
        file: fileEntity,
      };
    } catch (error) {
      console.error(error);
      throw new CustomError(MINIFICATION_FAILED);
    }
  }
}
