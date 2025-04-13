import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import logger from 'src/logger/users.logger';
import { Cache } from "@nestjs/cache-manager"

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly cacheManager: Cache
    ) { }
    private _products: Array<Product> = new Array<Product>;


    public async createProduct(productData: ProductDto): Promise<Product> {
        logger.info('Creating a new product');
        const product: ProductDto = this.productRepository.create(productData);
        const savedProduct = await this.productRepository.save(product);
        logger.info(`Product created with ID: ${savedProduct.id}`);
        return savedProduct;
        // return this.productRepository.save(product);
    }

    public async createProducts(productsData: Array<ProductDto>): Promise<Array<Product>> {
        const products: Array<ProductDto> = this.productRepository.create(productsData);

        return this.productRepository.save(products);
    }

    public async readAllProduct(): Promise<Array<Product>> {
        logger.info('Fetching all products');

        const cachedProducts = await this.cacheManager.get<Product[]>('searchall');
        if (cachedProducts) {
            logger.info('Returning products from cache');

            console.log('Получение данных из кэша');
            return cachedProducts;
        }
        // return this.productRepository.find();
        const products = await this.productRepository.find();
        await this.cacheManager.set('searchall', products);
        logger.info(`Fetched ${products.length} products`);
        return products;
    }

    public async readOneByIdProduct(id: number): Promise<Product> {
        logger.info(`Fetching product with ID: ${id}`);
        // return this.productRepository.findOneBy({ id });
        const cachedProduct = await this.cacheManager.get<Product>(`product = ${id}`);
        if (cachedProduct) {
            logger.info(`Returning product ${id} from cache`);
            return cachedProduct;
        }

        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            logger.error(`No product found with ID: ${id}`);
            throw new BadRequestException('No product found with the provided id');
        }

        await this.cacheManager.set(`product_${id}`, product);
        logger.info(`Fetched product with ID: ${id}`);
        return product;
    }

    public async updateProduct(id: number, productData: ProductDto): Promise<UpdateResult> {
        logger.info(`Updating product with ID: ${id}`);
        try {
            return this.productRepository.update(id, productData);
        } catch {
            throw new BadRequestException("Товаар с данным id не найден")
        }
    }

    public async deleteProduct(id: number): Promise<DeleteResult> {
        try {
            return this.productRepository.delete(id);
        } catch {
            throw new BadRequestException("Товар с данным id не найден");
        }
    }

    public async searchProduct(word: string): Promise<Product[] | null> {

        try {
            console.log("keyWord")
            const products: Product[] | null = await this.productRepository
                .createQueryBuilder("product")
                .where("name LIKE :word", { word: `%${word}%` })
                .orWhere("description LIKE :word", { word: `%${word}%` })
                .getMany()
            return products;
        } catch (error) {
            console.log("Error of writing the products: " + error)
        }
    }
}
