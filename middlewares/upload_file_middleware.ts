// files/mime-type.middleware.ts
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class MimeTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const file = req["file"];

    if (file) {
      const isJsFile = file.mimetype.includes("javascript");
      const isCssFile = file.mimetype.includes("css");
      const isImageFile = file.mimetype.startsWith("image/");
      // Check if the file is either a JS or CSS file
      if (file && !isJsFile && !isCssFile && !isImageFile) {
        throw new BadRequestException(
          "Invalid file type. Only CSS/JS files are allowed."
        );
      }
    }

    next();
  }
}
