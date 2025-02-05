import { Module } from '@nestjs/common';
import { FakersService } from './fakers.service';
import { FakersController } from './fakers.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FakersController],
  providers: [FakersService],
})
export class FakersModule { }
