import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('API Gateway Service')
    .setDescription('Шлюз API для маршрутизации запросов между микросервисами')
    .setVersion('1.0')
    .addTag('users - Сервис пользователей')
    .addTag('products - Сервис продуктов')
    .addTag('orders - Сервис заказов')
    .addTag('reviews - Сервис отзывов')
    .addTag('chat - Чат сервис')
    .addTag('auth - Сервис авторизации и безопасности')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
