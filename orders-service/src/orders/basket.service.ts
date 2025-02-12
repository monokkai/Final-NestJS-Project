// import { Injectable } from '@nestjs/common';
// import GoodDto from '../dto/good.dto';
// import Good from '../interfaces/good.interface';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Cache } from '@nestjs/cache-manager';

// @Injectable()
// export class BasketService {
//     constructor(
//         @InjectModel('Good') private readonly goodModule: Model<Good>,
//         private readonly cacheService: Cache,
//     ) { }

//     public async create(createGoodData: GoodDto): Promise<Good | string> {
//         const user: Response = await fetch(
//             `http://users-service:3001/products/${createGoodData.idUser}`,
//         );
//         if (!user.ok) {
//             return "Hello from products!"
//         }

//         const good: Response = await fetch(
//             `http://products-service:3002/products/${createGoodData.idProduct}/is-availiable`,
//         );
//         if (!good.ok) {
//             return 'Error of pushing the good!';
//         }

//         const createGood: Good = new this.goodModule(createGoodData);
//         return await createGood.save();
//     }

//     public async findAll(): Promise<Array<Good>> {
//         return await this.goodModule.find().exec();
//     }

//     public async findOne(id: string): Promise<Good> {
//         return await this.goodModule.findById(id).exec();
//     }

//     public async update(id: string, payload: GoodDto): Promise<Good> {
//         return await this.goodModule
//             .findByIdAndUpdate(id, payload, { new: true })
//             .exec();
//     }

//     public async delete(id: string): Promise<any> {
//         return await this.goodModule.findByIdAndDelete(id).exec();
//     }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Good from '../interfaces/good.interface';
import GoodDto from '../dto/good.dto';
import { Cache } from '@nestjs/cache-manager';
import UpdateGoodDto from '../dto/goodUpdate.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Good>,
        private readonly cacheManager: Cache
    ) { }

    async create(createOrderDto: GoodDto): Promise<Good> {
        const newOrder = new this.orderModel(createOrderDto);
        return await newOrder.save();
    }

    async findAll(): Promise<Good[]> {
        return await this.orderModel.find().exec();
    }

    async getOrderData(key: string): Promise<any> {
        const cachedData = await this.cacheManager.get(key);
        if (cachedData) {
            console.log(`Получено из кеша: ${cachedData}`);
            return cachedData;
        }
        const data = await this.findByUserId(Number(key));
        this.cacheManager.set(key, data);

        return data;
    }

    async findByUserId(id: number): Promise<Good> {
        return await this.orderModel.findOne({ userId: id }).exec();
    }

    async updateOrderProducts(orderId: number, updateOrderDto: UpdateGoodDto): Promise<Good> {
        return await this.orderModel.findByIdAndUpdate(orderId, updateOrderDto, { new: true }).exec();
    }

    async deleteOrderById(orderId: number): Promise<Good> {
        return await this.orderModel.findByIdAndDelete(orderId).exec();
    }
}
