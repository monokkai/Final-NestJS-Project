import { Module } from '@nestjs/common';
import { BasketModule } from './basket/basket.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { WinstonModule } from 'nest-winston';
import logger from './logger/orders.logger';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configServise: ConfigService) => ({
                uri: configServise.get<string>('MONGODB_URI')
            }),
            inject: [ConfigService]
        }),
        CacheModule.register({
            ttl: 6000,
            max: 100,
        }),
        WinstonModule.forRoot({
            instance: logger,
        }),
        BasketModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
