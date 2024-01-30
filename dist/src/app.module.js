"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const dotenv = require("dotenv");
dotenv.config();
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("./user/user.module");
const upload_module_1 = require("./upload/upload.module");
const middlewares_1 = require("../middlewares");
const platform_express_1 = require("@nestjs/platform-express");
const process = require("process");
const models_1 = require("../libs/models");
console.log(__dirname.replace("src", "libs" + "/models.{.ts,.js}"));
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(middlewares_1.CurrentUserMiddleware).forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "127.0.0.1",
                port: 5432,
                username: process.env.DATABASE_USER || "reza",
                password: process.env.DATABASE_PASSWORD || "reza",
                database: process.env.DATABASE_HOST || "minification",
                entities: [__dirname.replace("src", "libs") + "/models/*{.ts,.js}"],
                synchronize: true,
                logging: false,
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: "1h" },
            }),
            user_module_1.UserModule,
            upload_module_1.UploadModule,
            typeorm_1.TypeOrmModule.forFeature(models_1.entities),
            platform_express_1.MulterModule.register({ dest: "/opt" }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map