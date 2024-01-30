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
exports.UserSignupHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const user_signup_command_1 = require("../impl/user_signup.command");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../../../../libs/models");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const helpers_1 = require("../../../../helpers");
let UserSignupHandler = class UserSignupHandler {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async execute(command) {
        const { UserSignupDto } = command;
        const { email, password, name } = UserSignupDto;
        const hashed_password = await (0, helpers_1.generateHashPassword)(password);
        const user = this.userRepo.create({
            email,
            password: hashed_password,
            name,
        });
        await user.save();
        const token = this.jwtService.sign((0, helpers_1.generateUserToken)(user));
        return { user: user, token: token };
    }
};
exports.UserSignupHandler = UserSignupHandler;
exports.UserSignupHandler = UserSignupHandler = __decorate([
    (0, cqrs_1.CommandHandler)(user_signup_command_1.UserSignupCommand),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserSignupHandler);
//# sourceMappingURL=user_signup.handler.js.map