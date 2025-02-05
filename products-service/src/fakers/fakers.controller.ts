import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FakersService } from './fakers.service';

@Controller('products/faker')
export class FakersController {
    constructor(private readonly fakersService: FakersService) {}

    @Get()
    public async createProducts() {
        await this.fakersService.createProducts(10);
        return 'Goods were successfully uploaded ';
    }
    @Get(':count')
    public async createCountProducts(
        @Param('count', ParseIntPipe) count: number,
    ) {
        await this.fakersService.createProducts(count);
        return 'Good!!!!';
    }
}
