import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Gestion Hospitalière')
    .setDescription('Documentation des APIs pour l\'application NAFIS.')
    .setVersion('1.0.0')
    .addTag('NAFIS')
    .build();

  //Afficher les routes existantes
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Afficher les routes predefinies
  // const swaggerDocument = YAML.load('openapi.yaml');
  // app.use('/api-docs', require('swagger-ui-express').serve, require('swagger-ui-express').setup(swaggerDocument));

  app.enableCors({
    origin: 'http://localhost:4200',
  })
  Logger.log('PostgreSQL is running on port 5432', 'Bootstrap');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
