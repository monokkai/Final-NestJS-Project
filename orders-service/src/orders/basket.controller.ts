// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     Patch,
//     Post,
// } from '@nestjs/common';
// import { BasketService } from './basket.service';
// import GoodDto from '../dto/good.dto';
// import Good from './entity/good';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// @Controller('goods')
// export class BasketController {
//     constructor(private readonly goodService: BasketService) { }

//     @Post('new')
//     @ApiOperation({ summary: 'Создаем новый товар.' })
//     @ApiResponse({ status: 200, description: 'Товар успешно создан.', type: GoodDto })
//     @ApiResponse({ status: 404, description: 'Товар не может быть найден.' })
//     public async create(
//         @Body() createGoodData: GoodDto,
//     ): Promise<Good | string> {
//         return this.goodService.create(createGoodData);
//     }

//     @Get('findall')
//     @ApiOperation({ summary: 'Выводим все товары.' })
//     @ApiResponse({ status: 200, description: 'Товары успешно найдены.', type: Array<Good[]> })
//     @ApiResponse({ status: 404, description: 'Товары не могут быть найдены.' })
//     public async findAll(): Promise<Array<Good>> {
//         return this.goodService.findAll();
//     }

//     @Get(':id')
//     @ApiOperation({ summary: 'Находим товар по ID.' })
//     @ApiResponse({ status: 200, description: 'Товар успешно найден по ID.', type: Good })
//     @ApiResponse({ status: 404, description: 'Товар по ID не найден.' })
//     public async findOne(@Param('id') id: string): Promise<Good> {
//         return this.goodService.findOne(id);
//     }

//     @Patch(':id')
//     @ApiOperation({ summary: 'Находим по ID товар.' })
//     @ApiResponse({ status: 200, description: 'Товар успешно найден.', type: Good })
//     @ApiResponse({ status: 404, description: 'Товар не может быть найден.' })
//     public async update(
//         @Param('id') id: string,
//         @Body() payload: GoodDto,
//     ): Promise<Good> {
//         return this.goodService.update(id, payload);
//     }

//     @Delete(':id')
//     @ApiOperation({ summary: 'Удаляем товар по ID.' })
//     @ApiResponse({ status: 200, description: 'Товар успешно удален по ID.' })
//     @ApiResponse({ status: 404, description: 'Товар по ID не найден.' })
//     public async deleteOrder(@Param('id') id: string): Promise<any> {
//         return this.goodService.delete(id);
//     }
// }


import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OrdersService } from './basket.service';
import GoodDto from '../dto/good.dto';
import Good from '../interfaces/good.interface';
import UpdateGoodDto from '../dto/goodUpdate.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async create(@Body() createOrderDto: GoodDto): Promise<Good> {
        return await this.ordersService.create(createOrderDto);
    }

    @Get()
    async findAll(): Promise<Good[]> {
        return this.ordersService.findAll();
    }

    @Get(':userId')
    async getProductById(@Param('userId') userId: number): Promise<Good> {
        return this.ordersService.getOrderData(String(userId));
    }

    @Patch(':orderId')
    async updateOrderProducts(@Param('orderId') orderId: number, @Body() updateOrderDto: UpdateGoodDto): Promise<Good> {
        return this.ordersService.updateOrderProducts(orderId, updateOrderDto);
    }

    @Delete(':orderId')
    async deleteOrderById(@Param('orderId') orderId: number): Promise<Good> {
        return this.ordersService.deleteOrderById(orderId);
    }
}
