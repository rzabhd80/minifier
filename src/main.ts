import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import * as helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Minification App")
    .setDescription("Minify your source code and files")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const globalPrefix = "api";
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(globalPrefix + "/doc", app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: "MNFY-" + process.env.MODE,
  });
  app.use(helmet);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
