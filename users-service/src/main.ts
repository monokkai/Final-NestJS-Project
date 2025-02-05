import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Users Service')
    .setDescription('Данный сервис предоставляет работу в серверной части с user. Есть все необходимые методы, генерация с помощью faker, методы: Get, Post, Patch, Delete')
    .setVersion('1.0')
    .addTag('http://localhost:3000/users')
    .addTag("http://localhost:3000/users/faker")
    .addTag("http://localhost:3000/users/searchall")
    .addTag("http://localhost:3000/users/remove=:id")
    .addTag("http://localhost:3000/users/update=:id") 
    .addTag("http://localhost:3000/users/news")
    .addTag("http://localhost:3000/users/new")
    .addTag("http://localhost:3000/users/searchid=:id")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.listen(process.env.PORT ?? 3000)
}
bootstrap();