import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // enable cors

  app.enableCors({
    origin: "http://localhost:4200",
  });
  Logger.log("PostgreSQL is running on port 5432", "Bootstrap");

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
