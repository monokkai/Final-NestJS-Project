import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FakersModule } from './fakers/fakers.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    UsersModule, 
    FakersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
