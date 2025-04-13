import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors();
  
  // Display all available routes
  logger.log('Available routes:');
  const server = app.getHttpServer();
  const router = server._events.request._router;
  
  const availableRoutes = router.stack
    .filter(layer => layer.route)
    .map(layer => {
      return {
        path: layer.route?.path,
        method: layer.route?.stack[0].method
      };
    });
  
  logger.log(`Routes: ${JSON.stringify(availableRoutes)}`);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Reviews Service API')
    .setDescription('API for managing product reviews')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
