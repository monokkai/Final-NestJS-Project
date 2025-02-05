import { Document } from 'mongoose';
import GoodDto from '../dto/good.dto';

interface Good extends Document {
    readonly createAt: Date;
    readonly id: number;
    readonly updatedAt: Date;
    readonly idProduct: Array<GoodDto>;
    readonly idUser: number;
}

export default Good;
