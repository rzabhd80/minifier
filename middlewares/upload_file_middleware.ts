// files/mime-type.middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class MimeTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedFileTypes = [".css", ".js"];
    const fileExtension = req.file?.originalname.split(".").pop();
    if (
      req.file &&
      fileExtension &&
      !allowedFileTypes.includes(`.${fileExtension.toLowerCase()}`)
    ) {
      return res
        .status(400)
        .send("Invalid file type. Only CSS and JS files are allowed.");
    }
    next();
  }
}
