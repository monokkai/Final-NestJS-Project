import { faker } from '@faker-js/faker/locale/ru';
import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/products/dto/product.dto';
// import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class FakersService {
    constructor(private readonly productsService: ProductsService) { }
    createProducts(count: number) {
        const fakeProducts: Array<ProductDto> = new Array<ProductDto>();

        for (let i = 0; i < count; i++) {
            const product: ProductDto = new ProductDto();
            product.name = faker.commerce.productName();
            product.description = faker.commerce.productDescription();
            product.price = faker.commerce.price();
            product.stockQuantity = faker.number.int({ min: 0, max: 100 });
            product.category = faker.helpers.arrayElement(["Продукты", "Техника"])
            product.imageUrl = faker.image.url();
            product.createAt = faker.date.past({ years: 2 });
            product.updatedAt = faker.date.past({ years: 1 });
            fakeProducts.push(product);
        }

        this.productsService.createProducts(fakeProducts);
        return `Пользователей созданно в кол-ве ${count}`
    }
}
