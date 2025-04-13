import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SecurityRoleGuard } from './guard/role.guard';
// import { UserGuard } from './guard/user.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('new')
  @UseGuards(SecurityRoleGuard)
  @ApiOperation({ summary: 'Создаем продукт (требуются права manager или operator)' })
  @ApiResponse({ status: 200, description: 'Продукт успешно создан.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен. Необходимы права manager или operator.' })
  @ApiResponse({ status: 401, description: 'Отсутствует идентификатор пользователя.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Product Name' },
        description: { type: 'string', example: 'Product Description' },
        price: { type: 'number', example: 99.99 },
        userId: { type: 'string', example: '65f0123456789012345678' }
      },
      required: ['name', 'description', 'price', 'userId']
    }
  })
  public createProduct(@Body() productData: ProductDto): Promise<Product> {
    return this.productsService.createProduct(productData)
  }

  @Get('searchall')
  @ApiOperation({ summary: 'Находим все созданные продукты.' })
  @ApiResponse({ status: 200, description: 'Продукты успешно найдены.' })
  @ApiResponse({ status: 404, description: 'Продукты не найдены.' })
  public async readAllProduct(): Promise<Array<Product>> {
    return await this.productsService.readAllProduct();
  }

  @Get('search')
  @ApiOperation({ summary: 'Ищем продукт по ключевому слову. Например: searchWord: "chair".' })
  @ApiResponse({ status: 200, description: 'Продукт успешно найден.' })
  @ApiResponse({ status: 404, description: 'Продукт не найден.' })
  public async searchProduct(@Query("searchWord") searchWord: string): Promise<Product[] | null> {
    return this.productsService.searchProduct(searchWord)
  }

  @Get('searchid=:id')
  @ApiOperation({ summary: 'Ищем продукт по ID.' })
  @ApiResponse({ status: 200, description: 'Продукт успешно найден по ID.' })
  @ApiResponse({ status: 404, description: 'Продукт не может быть найден по ID.' })
  public async readOneByIdProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.readOneByIdProduct(id);
  }

  @Patch('update=:id')
  @UseGuards(SecurityRoleGuard)
  @ApiOperation({ summary: 'Обновляем продукт (требуются права manager или operator)' })
  @ApiResponse({ status: 200, description: 'Продукт успешно обновлен.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен. Необходимы права manager или operator.' })
  @ApiResponse({ status: 404, description: 'Продукт не может быть обновлен.' })
  public async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() productData: ProductDto): Promise<UpdateResult> {
    return await this.productsService.updateProduct(id, productData)
  }

  @Delete('remove=:id')
  @UseGuards(SecurityRoleGuard)
  @ApiOperation({ summary: 'Удаляем продукт по ID (требуются права manager или operator)' })
  @ApiResponse({ status: 200, description: 'Продукт успешно удален по ID.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен. Необходимы права manager или operator.' })
  @ApiResponse({ status: 404, description: 'Продукт не может быть удален по ID.' })
  public async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.productsService.deleteProduct(id);
  }
}
