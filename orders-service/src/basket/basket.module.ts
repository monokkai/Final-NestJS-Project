import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import GoodSchema from '../schemas/good.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Good', schema: GoodSchema }]),
        CacheModule.register({
            ttl: 6000,
            max: 100,
        }),
    ],

    controllers: [BasketController],
    providers: [BasketService],
})
export class BasketModule { }
