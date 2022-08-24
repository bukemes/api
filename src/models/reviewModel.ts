import mongoose, { Schema, Document } from 'mongoose'; // Types

export interface IReviewData {
    email: string,
    userId: mongoose.Types.ObjectId;
    tourId: mongoose.Types.ObjectId;
    text: string; // review body
}

export interface ReviewDocument extends IReviewData, Document {
    updatedAt: Date;
    createdAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>({
    email: {
        type: String, 
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tour',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const REVIEW = mongoose.model('Review', reviewSchema);
export default REVIEW;