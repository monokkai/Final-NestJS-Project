import GoodDto from '../../dto/good.dto';
import { IsArray, IsDate, IsInt, IsString } from "class-validator"

class Good {
    @IsInt()
    id: number;
    @IsDate()
    createAt: Date;
    @IsInt()
    idUser: number;
    @IsString()
    updatedAt: Date;
    @IsArray()
    idProduct: Array<GoodDto>;
}

export default Good;
