import { Document } from "mongoose";

export interface Review extends Document {
    readonly userId: number;
    readonly productId: number;
    readonly report: {
        readonly title: string;
        readonly reportInfo: string;
        readonly rating: number;
    };
}