import { Module } from '@nestjs/common';
import { OrdersService } from './basket.service';
import { OrdersController } from './basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from '../schemas/good.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Order', schema: OrdersSchema }],
        ),
        CacheModule.register({
            ttl: 60000,
            max: 100
        })
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule { }
