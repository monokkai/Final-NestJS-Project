import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AbilitiesGuard } from './guards/abilities.guard';
import { CheckAbilities } from './decorators/abilities.decorator';
import { Action } from './abilities/ability.factory';
import { Review } from './schemas/review.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Get('test')
  testEndpoint() {
    return { message: 'Reviews service is working!' };
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'The review has been successfully created' })
  create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    if (createReviewDto.comment && !createReviewDto.text) {
      createReviewDto.text = createReviewDto.comment;
    }

    if (req.user) {
      createReviewDto.authorId = req.user.id;
      createReviewDto.authorName = req.user.username;
    }

    if (!createReviewDto.authorId) {
      createReviewDto.authorId = 'anonymous';
      createReviewDto.authorName = 'Anonymous User';
    }

    return this.reviewsService.create(createReviewDto);
  }

  @Get('product/:id')
  findByProduct(@Param('id') id: string) {
    return this.reviewsService.findByProduct(id);
  }

  @Get(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Review })
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiResponse({ status: 200, description: 'Return the review' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Review })
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({ status: 200, description: 'The review has been successfully updated' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req,
  ) {
    if (req.user && req.user.role !== 'admin' && req.user.role !== 'moderator') {
      const review = await this.reviewsService.findOne(id);
      if (review.authorId !== req.user.id) {
        throw new Error('You can only update your own reviews');
      }
    }

    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Review })
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, description: 'The review has been successfully deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async remove(@Param('id') id: string, @Req() req) {
    if (req.user && req.user.role !== 'admin') {
      const review = await this.reviewsService.findOne(id);
      if (review.authorId !== req.user.id) {
        throw new Error('You can only delete your own reviews');
      }
    }

    return this.reviewsService.remove(id);
  }
}
