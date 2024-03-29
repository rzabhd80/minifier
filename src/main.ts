import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swaggerConfig = new DocumentBuilder()
    .setTitle("MNFY")
    .setDescription("minify your css & js files")
    .setVersion("1.0.0")
    .addTag("api")
    .addBearerAuth() // Specify bearer authentication if used
    .build();
  const globalPrefix = "api";
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(globalPrefix + "/doc", app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: "MNFY-" + process.env.MODE,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`application is up on port ${port}`);
  console.log(`documentation is up on 127.0.0.1:${port}/api/docs`);
}

bootstrap();
