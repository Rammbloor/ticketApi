import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  const configService = app.get(ConfigService);
  const Port = configService.get<number>('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Тз Rammbloor')
    .setDescription('web-сервис для работы с хранилищем данных перелётов')
    .setVersion('1.0.0')
    .addTag('Rammbloor')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(Port, () => console.log(`Server is running on port ${Port}!`));
}

start();
