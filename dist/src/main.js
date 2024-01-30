"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const process = require("process");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("MNFY")
        .setDescription("minify your css & js files")
        .setVersion("1.0.0")
        .addTag("api")
        .addBearerAuth()
        .build();
    const globalPrefix = "api";
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(globalPrefix + "/doc", app, document, {
        swaggerOptions: { persistAuthorization: true },
        customSiteTitle: "MNFY-" + process.env.MODE,
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`application is up on port ${port}`);
    console.log(`documentation is up on 127.0.0.1:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map