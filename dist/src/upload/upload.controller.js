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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const dto_1 = require("./dto");
const cqrs_1 = require("@nestjs/cqrs");
const impl_1 = require("./command/impl");
const decorators_1 = require("../../decorators");
const models_1 = require("../../libs/models");
const middlewares_1 = require("../../middlewares");
const get_users_file_query_1 = require("./queries/impl/get_users_file.query");
let UploadController = class UploadController {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async uploadFile(uploadFileDto, file, user) {
        console.log(`current user ${user.email}`);
        return this.commandBus.execute(new impl_1.UploadFileCommand(uploadFileDto, user.id, file));
    }
    async getFiles(user) {
        return this.queryBus.execute(new get_users_file_query_1.GetUsersFileQuery(user.id));
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)("multipart/form-data", "application/json"),
    (0, swagger_1.ApiOperation)({
        description: "upload js or css file",
    }),
    (0, common_1.UseGuards)(middlewares_1.userGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, decorators_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UploadFileDtoRequest, Object, models_1.User]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ description: "get users file" }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorators_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.User]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getFiles", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)("file/"),
    (0, common_1.Controller)("upload"),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], UploadController);
//# sourceMappingURL=upload.controller.js.map