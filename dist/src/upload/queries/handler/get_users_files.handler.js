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
exports.GetUsersFilesHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const get_users_file_query_1 = require("../impl/get_users_file.query");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../../../../libs/models");
const typeorm_2 = require("typeorm");
const exceptions_1 = require("../../../../exceptions/exceptions");
let GetUsersFilesHandler = class GetUsersFilesHandler {
    constructor(userRepo, fileRepo) {
        this.userRepo = userRepo;
        this.fileRepo = fileRepo;
    }
    async execute(query) {
        const { userId } = query;
        if (!userId) {
            throw new exceptions_1.CustomError(exceptions_1.INVALID_TOKEN);
        }
        const usersFiles = this.userRepo
            .createQueryBuilder("user")
            .andWhere("user.id = :userId", { userId: userId })
            .leftJoinAndSelect("user.uploadedFiles", "uploadedFiles")
            .getOne();
        return usersFiles;
    }
};
exports.GetUsersFilesHandler = GetUsersFilesHandler;
exports.GetUsersFilesHandler = GetUsersFilesHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_users_file_query_1.GetUsersFileQuery),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(models_1.UploadedFile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GetUsersFilesHandler);
//# sourceMappingURL=get_users_files.handler.js.map