"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const impl_1 = require("../impl");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../../../../libs/models");
const typeorm_2 = require("typeorm");
const terser_1 = require("terser");
const exceptions_1 = require("../../../../exceptions/exceptions");
const path = require("path");
const fs = require("fs");
const CleanCSS = require("clean-css");
let UploadFileHandler = class UploadFileHandler {
    constructor(userRepository, uploadedFileRepository) {
        this.userRepository = userRepository;
        this.uploadedFileRepository = uploadedFileRepository;
    }
    async createDirectoryIfNotExists(filePath) {
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            await fs.promises.mkdir(dirPath, { recursive: true });
        }
        if (!fs.existsSync(filePath)) {
            await fs.promises.mkdir(filePath, { recursive: true });
        }
    }
    async saveFile(file, filePath) {
        await fs.promises.writeFile(filePath, file.buffer);
    }
    async not_minified_handler(filePath) {
        try {
            const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
            let data = "";
            readStream.on("data", (chunk) => {
                data += chunk;
            });
            readStream.on("end", async () => {
                await fs.promises.writeFile(filePath, data, "utf-8");
                console.log(`successfully written to: ${filePath}`);
            });
            readStream.on("error", () => {
                throw new exceptions_1.CustomError(exceptions_1.WRITE_FILE_ERROR);
            });
        }
        catch (error) {
            throw new exceptions_1.CustomError(exceptions_1.WRITE_FILE_ERROR);
        }
    }
    async minify_js_file(filePath) {
        try {
            const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
            let minifiedJs = "";
            readStream.on("data", async (chunk) => {
                const minificationResult = await (0, terser_1.minify)(chunk.toString());
                if (minificationResult.code) {
                    minifiedJs += minificationResult.code;
                }
            });
            readStream.on("end", async () => {
                await fs.promises.writeFile(filePath, minifiedJs, "utf-8");
                console.log(`Minification successful. Minified JavaScript written to: ${filePath}`);
            });
            readStream.on("error", (error) => {
                throw error;
            });
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
    async minify_css_file(filePath) {
        try {
            const cleanCss = new CleanCSS();
            const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
            let minifiedCss = "";
            readStream.on("data", (chunk) => {
                minifiedCss += cleanCss.minify(chunk).styles;
            });
            readStream.on("end", async () => {
                await fs.promises.writeFile(filePath, minifiedCss, "utf-8");
                console.log(`Minification successful. Minified CSS written to: ${filePath}`);
            });
            readStream.on("error", () => {
                throw new exceptions_1.CustomError(exceptions_1.MINIFICATION_FAILED);
            });
        }
        catch (error) {
            throw new exceptions_1.CustomError(exceptions_1.MINIFICATION_FAILED);
        }
    }
    async minifyFile(filePath, mimeTYpe) {
        const startTime = Date.now();
        const memoryUsageBefore = process.memoryUsage().heapUsed;
        if (mimeTYpe === "javascript" || mimeTYpe === "x-javascript")
            await this.minify_js_file(filePath);
        if (mimeTYpe === "css")
            await this.minify_css_file(filePath);
        const endTime = Date.now();
        const memoryUsageAfter = process.memoryUsage().heapUsed;
        const duration = endTime - startTime;
        const memoryUsage = memoryUsageAfter - memoryUsageBefore;
        return { duration: duration, memoryUsage: memoryUsage };
    }
    async execute(command) {
        const { userId, uploadFileDto, file } = command;
        const { minify } = uploadFileDto;
        const minify_value = minify.toString();
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new exceptions_1.CustomError(exceptions_1.USER_NOT_FOUND);
        const uploadedFileMime = file.mimetype.split("/")[1];
        if (!["javascript", "css", "x-javascript"].includes(uploadedFileMime))
            throw new exceptions_1.CustomError(exceptions_1.INVALID_MIMETYPE);
        const username = user.email;
        const userFolderPath = path.join("/opt", username);
        let safeFileName = path.basename(file.originalname);
        const file_name_type = safeFileName.split(".");
        if (minify_value === "false")
            safeFileName = file_name_type[0] + "_not_minified" + file_name_type[1];
        let existingFile = false;
        try {
            await this.createDirectoryIfNotExists(userFolderPath);
            const filePath = path.join(userFolderPath, safeFileName);
            await this.saveFile(file, filePath);
            let fileEntity = await this.uploadedFileRepository.findOne({
                where: { userId: userId, filename: safeFileName },
            });
            if (!fileEntity)
                fileEntity = new models_1.UploadedFile();
            else
                existingFile = true;
            if (minify_value === "true") {
                const { duration, memoryUsage } = await this.minifyFile(filePath, uploadedFileMime);
                fileEntity.minificationDuration = duration;
                fileEntity.memoryUsageAfterMinification = memoryUsage;
            }
            else
                await this.not_minified_handler(filePath);
            if (!existingFile) {
                fileEntity.filename = safeFileName;
                fileEntity.mimetype = uploadedFileMime;
                fileEntity.user = user;
                fileEntity.size = file.size;
                fileEntity.createdAt = new Date();
            }
            await fileEntity.save();
            const status_message = "File uploaded and minified successfully"
                ? minify_value
                : "File uploaded successfully";
            return {
                message: status_message,
                file: fileEntity,
            };
        }
        catch (error) {
            console.error(error);
            throw new exceptions_1.CustomError(exceptions_1.MINIFICATION_FAILED);
        }
    }
};
exports.UploadFileHandler = UploadFileHandler;
exports.UploadFileHandler = UploadFileHandler = __decorate([
    (0, cqrs_1.CommandHandler)(impl_1.UploadFileCommand),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(models_1.UploadedFile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UploadFileHandler);
//# sourceMappingURL=upload_file.handler.js.map