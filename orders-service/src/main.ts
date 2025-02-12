import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Orders Service')
    .setDescription('Данный сервис предоставляет работу в серверной части с product. Есть все необходимые методы, генерация с помощью faker, методы: Get, Post, Patch, Delete')
    .setVersion('1.0')
    .addTag('http://localhost:3000/goods/new')
    .addTag('http://localhost:3000/goods/findall')
    .addTag('http://localhost:3000/goods/:id') //найди по Id Get
    .addTag('http://localhost:3000/goods/:id') //частичное обновление Patch
    .addTag('http://localhost:3000/goods/:id') //удаление Delete
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.listen(process.env.PORT ?? 3000)
}
bootstrap();