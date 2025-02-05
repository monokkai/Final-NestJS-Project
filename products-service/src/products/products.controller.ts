import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { UserGuard } from './guard/user.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('new')
  @ApiOperation({ summary: 'Создаем продукт.' })
  @ApiResponse({ status: 200, description: 'Продукт успешно создан.' })
  @ApiResponse({ status: 404, description: 'Продукт не найден.' })
  public createProduct(@Body() productData: ProductDto): Promise<Product> {
    return this.productsService.createProduct(productData)
  }

  @Get('searchall')
  @ApiOperation({ summary: 'Находим все созданные продукты.' })
  @ApiResponse({ status: 200, description: 'Продукты успешно найдены.' })
  @ApiResponse({ status: 404, description: 'Продукты не найдены.' })
  // @UseGuards(UserGuard)
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
  @ApiOperation({ summary: 'Обновляем продукт.' })
  @ApiResponse({ status: 200, description: 'Продукт успешно обновлен.' })
  @ApiResponse({ status: 404, description: 'Продукт не может быть обновлен.' })
  public async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() productData: ProductDto): Promise<UpdateResult> {
    return await this.productsService.updateProduct(id, productData)
  }

  @Delete('remove=:id')
  @ApiOperation({ summary: 'Удаляем продукт по ID.' })
  @ApiResponse({ status: 200, description: 'Продукт успешно удален по ID.' })
  @ApiResponse({ status: 404, description: 'Продукт не может быть удален по ID.' })
  public async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.productsService.deleteProduct(id);
  }
}
