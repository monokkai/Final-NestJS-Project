import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { Review } from './interfaces/review.interface';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':userId') 
  async getReviewByUserId(@Param('userId') userId: number): Promise<Review> {
    return this.reviewsService.getReviewData(String(userId));
  }

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.reviewsService.createReview(createReviewDto);
  }
}
