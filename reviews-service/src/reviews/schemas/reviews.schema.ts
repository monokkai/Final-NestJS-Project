import { Schema } from 'mongoose';

const ReviewsSchema = new Schema({
    idUser: { type: Number, required: true },
    idGood: { type: Number, required: true },
    report: {
        title: { type: String, required: true },
        reviewInfo: { type: String },
        rating: { type: Number }
    }
});

export default ReviewsSchema;