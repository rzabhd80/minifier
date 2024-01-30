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
exports.UserLoginHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../../../../libs/models");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const helpers_1 = require("../../../../helpers");
const user_login_command_1 = require("../impl/user_login.command");
const exceptions_1 = require("../../../../exceptions/exceptions");
let UserLoginHandler = class UserLoginHandler {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async execute(command) {
        const { UserLoginDto } = command;
        const { email, password } = UserLoginDto;
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user)
            throw new exceptions_1.CustomError(exceptions_1.USER_NOT_FOUND);
        const isPasswordVerified = await (0, helpers_1.verifyPassword)(user.password, password);
        if (!isPasswordVerified)
            throw new exceptions_1.CustomError(exceptions_1.INVALID_PASSWORD);
        const token = this.jwtService.sign((0, helpers_1.generateUserToken)(user));
        return { user: user, token: token };
    }
};
exports.UserLoginHandler = UserLoginHandler;
exports.UserLoginHandler = UserLoginHandler = __decorate([
    (0, cqrs_1.CommandHandler)(user_login_command_1.UserLoginCommand),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserLoginHandler);
//# sourceMappingURL=user_login.handler.js.map