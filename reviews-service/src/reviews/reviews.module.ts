import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { Review, ReviewSchema } from './schemas/review.schema';
import { AbilityFactory } from './abilities/ability.factory';
import { AbilitiesGuard } from './guards/abilities.guard';
import { AuthMiddleware } from './middleware/auth.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    HttpModule,
  ],

  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    AbilityFactory,
    AbilitiesGuard,
  ],
})
export class ReviewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*'); 
  }
}
