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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const dto_1 = require("./dto");
const user_signup_command_1 = require("./commands/impl/user_signup.command");
const user_login_command_1 = require("./commands/impl/user_login.command");
const seeder_factory_command_1 = require("./commands/impl/seeder_factory.command");
let UserController = class UserController {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    async seedDatabase() {
        return this.commandBus.execute(new seeder_factory_command_1.SeederFactoryCommand());
    }
    async signupUser(signUpUserDto) {
        return this.commandBus.execute(new user_signup_command_1.UserSignupCommand(signUpUserDto));
    }
    async loginUser(loginUserDto) {
        return this.commandBus.execute(new user_login_command_1.UserLoginCommand(loginUserDto));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("/seed"),
    (0, swagger_1.ApiOperation)({
        description: "seeds database with factory, created user will be parspack@parspack.com",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "seedDatabase", null);
__decorate([
    (0, common_1.Post)("/signup"),
    (0, swagger_1.ApiOperation)({ description: "signup user" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UserSignupDtoRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signupUser", null);
__decorate([
    (0, common_1.Post)("/login"),
    (0, swagger_1.ApiOperation)({ description: "login user" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UserLoginDtoRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("/user"),
    (0, common_1.Controller)("user"),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [cqrs_1.QueryBus,
        cqrs_1.CommandBus])
], UserController);
//# sourceMappingURL=user.controller.js.map