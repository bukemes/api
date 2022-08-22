// import mongoose, { Schema } from 'mongoose';
import mongoose, { Schema, Document } from 'mongoose'; // Types

export interface TourInput {
    isPublished: boolean;
    title: string;
    description: string;
    headerImage: string;
    duration: number;
}

export interface TourDocument extends TourInput, Document {
    updatedAt: Date;
    createdAt: Date;
}

const tourSchema = new Schema<TourDocument>({
    isPublished: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    headerImage: {
        type: String,
    },
    duration: {
        type: Number,
        required: true,
    },
}, { timestamps: true });


const TOUR = mongoose.model('Tour', tourSchema);
// export default mongoose.model('Tour', tourSchema);
export default TOUR;