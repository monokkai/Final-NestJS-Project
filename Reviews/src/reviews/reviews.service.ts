import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/review.dto';
import { Review } from './interfaces/review.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel('Review') private readonly reviewModel: Model<Review>,
        private readonly cacheManager: Cache
){}

    async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
        const newReview = new this.reviewModel(createReviewDto);
        return await newReview.save();
    }

    // Получение данных из бд при помощи кеша
    async getReviewData(key: string): Promise<any> {
        const cachedData = await this.cacheManager.get(key);

        if (cachedData) {
            console.log(`Данные получены из кеша: ${cachedData}`);
            return cachedData;
        }

        const data = await this.getReviewByUserId(Number(key));
        this.cacheManager.set(key, data);
        return data;
    }


    async getReviewByUserId(userId: number): Promise<Review> {
        return this.reviewModel.findOne( {userId: userId} );
    }
}
