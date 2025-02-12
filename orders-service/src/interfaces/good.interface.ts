import { Document } from "mongoose";

interface Good extends Document {
    readonly userId: number;
    readonly productIds: number[];
    readonly date: Date;
}

export default Good;