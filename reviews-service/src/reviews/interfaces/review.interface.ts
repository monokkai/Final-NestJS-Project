import { Document } from "mongoose"

interface Review extends Document {
    readonly idUser: number;
    readonly idGood: number;
    readonly report: {
        title: string;
        reviewInfo: string;
        rating: number;
    };
}

export default Review;