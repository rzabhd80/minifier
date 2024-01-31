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
exports.SeederFactoryHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../../../../libs/models");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const helpers_1 = require("../../../../helpers");
const seeder_factory_command_1 = require("../impl/seeder_factory.command");
let SeederFactoryHandler = class SeederFactoryHandler {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async execute() {
        let user = await this.userRepo.findOne({
            where: { email: "parspack@parspack.com", name: "parspack" },
        });
        const hashed_password = await (0, helpers_1.generateHashPassword)("Twu5hKXXKZEQaJ");
        if (user) {
            const token = this.jwtService.sign((0, helpers_1.generateUserToken)(user));
            return { user: user, token: token };
        }
        else {
            user = await this.userRepo
                .create({
                name: "parspack",
                email: "parspack@parspack.com",
                password: hashed_password,
            })
                .save();
        }
        const token = this.jwtService.sign((0, helpers_1.generateUserToken)(user));
        return { user: user, token: token };
    }
};
exports.SeederFactoryHandler = SeederFactoryHandler;
exports.SeederFactoryHandler = SeederFactoryHandler = __decorate([
    (0, cqrs_1.CommandHandler)(seeder_factory_command_1.SeederFactoryCommand),
    __param(0, (0, typeorm_1.InjectRepository)(models_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], SeederFactoryHandler);
//# sourceMappingURL=seeder_factory.handler.js.map