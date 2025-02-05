import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { FakersModule } from './fakers/fakers.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CacheModule.register({
      ttl: 6000,
      max: 100,
    }),
    ProductsModule,
    FakersModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
