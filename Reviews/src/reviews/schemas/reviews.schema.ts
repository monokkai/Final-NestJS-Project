import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
    userId: { type: Number, required: true},
    productId: { type: Number, required: true},

    report:  {
        title: { type: String, required: true},
        reportInfo: { type: String, required: true},
        rating: { type: Number, required: true}
    }
}) 