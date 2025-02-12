import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [

    ConfigModule.forRoot(  {
      envFilePath: 'development.env'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),

    ReviewsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
