import { IsInt, Min, IsDate } from "class-validator"

class GoodDto {
    @IsInt()
    @Min(0)
    userId: number;
    @IsDate()
    date: Date;
    @IsInt()
    @Min(0)
    productIds: number[]
}

export default GoodDto;
