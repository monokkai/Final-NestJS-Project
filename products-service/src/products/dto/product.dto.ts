import { IsDate, IsInt, IsString, Min } from "class-validator"

export class ProductDto {
        @IsString()
        name: string;
        @IsString()
        description: string;
        @IsString()
        price: string;
        @IsInt()
        @Min(0)
        stockQuantity: number;
        @IsString()
        category: string;
        @IsString()
        imageUrl: string;
        @IsDate()
        createAt: Date;
        @IsDate()
        updatedAt: Date;
}