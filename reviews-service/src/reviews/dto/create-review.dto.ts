import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsString()
  @IsOptional()
  authorId: string;

  @IsString()
  @IsOptional()
  authorName: string;
} 