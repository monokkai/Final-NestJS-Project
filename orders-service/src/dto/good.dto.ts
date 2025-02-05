import { IsInt, Min, IsDate } from "class-validator"

class GoodDto {
    @IsInt()
    @Min(0)
    idProduct: number;
    @IsDate()
    createAt: Date;
    @IsInt()
    @Min(0)
    idUser: number;
    @IsDate()
    updatedAt: Date;
    @IsInt()
    @Min(0)
    quantity: number;
}

export default GoodDto;
