import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { UserGuard } from './guard/user.guard';
import { RoleGuard } from './guard/user.roleGuard';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  CacheModule.register({
    ttl: 6000,
    max: 100,
  }),
    HttpModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UserGuard, RoleGuard],
  exports: [ProductsService],
})
export class ProductsModule { }
