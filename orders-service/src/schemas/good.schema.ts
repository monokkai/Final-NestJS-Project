import { Schema } from "mongoose";

export const OrdersSchema = new Schema({
    userId: { type: Number, required: true },
    productIds: { type: Array<number>, required: true },
    date: { type: Date, required: true }
});