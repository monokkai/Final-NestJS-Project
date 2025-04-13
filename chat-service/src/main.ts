import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use('/api', (req, res) => {
    res.json({
      service: 'Chat Service',
      description: 'API для чат-сервиса, который обрабатывает сообщения и поиск по продуктам',
      version: '1.0',
      endpoints: [
        {
          path: '/chat',
          method: 'GET',
          description: 'Получить информацию о чат-сервисе'
        },
        {
          path: '/chat/search',
          method: 'GET',
          description: 'Поиск продуктов по ключевому слову'
        }
      ]
    });
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
