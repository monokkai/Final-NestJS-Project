import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Products Service')
    .setDescription('Данный сервис предоставляет работу в серверной части с product. Есть все необходимые методы, генерация с помощью faker, методы: Get, Post, Patch, Delete')
    .setVersion('1.0')
    .addTag('http://localhost:3000/products')
    .addTag("http://localhost:3000/products/faker")
    .addTag("http://localhost:3000/products/faker/:count")
    .addTag("http://localhost:3000/products/searchall")
    .addTag("http://localhost:3000/products/search")
    .addTag("http://localhost:3000/products/remove=:id")
    .addTag("http://localhost:3000/products/update=:id") 
    .addTag("http://localhost:3000/products/new")
    .addTag("http://localhost:3000/products/searchid=:id")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.listen(process.env.PORT ?? 3000)
}
bootstrap();