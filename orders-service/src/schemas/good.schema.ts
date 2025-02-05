import { Schema } from 'mongoose';
import GoodDto from '../dto/good.dto';

const GoodSchema = new Schema({
    userId: { type: Number, require: true },
    productsId: { type: Array<GoodDto> },
    createAt: { type: Date },
    orderedAt: { type: Date },
    deliveredAt: { type: Date },
    isProduct: { type: Array<GoodDto> },
});

export default GoodSchema;
