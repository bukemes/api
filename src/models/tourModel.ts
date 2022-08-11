// import mongoose, { Schema } from 'mongoose';
import mongoose, { Types, Schema, Document } from 'mongoose';

export interface TourInput {
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


const tourModel = mongoose.model('Tour', tourSchema);
// export default mongoose.model('Tour', tourSchema);
export default tourModel;