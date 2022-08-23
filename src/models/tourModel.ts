import mongoose, { Schema, Document } from 'mongoose'; // Types

// export interface TourInput {
//     isPublished: boolean;
//     title: string;
//     description: string;
//     headerImage: string;
//     schedule: mongoose.Schema.Types.ObjectId;
//     duration: number;
// }

export interface LocalizedData {
    language: string;
    title: string;
    description: string;
}
export interface InternationalTourInput {
    isPublished: boolean;
    i18n: Array<LocalizedData>;
    headerImage: string;
    schedule: mongoose.Schema.Types.ObjectId;
    duration: number;
}
export interface TourDocument extends InternationalTourInput, Document {
    updatedAt: Date;
    createdAt: Date;
}

const tourSchema = new Schema<TourDocument>({
    isPublished: {
        type: Boolean,
        required: true,
    },
    // title: {
    //     type: String,
    //     required: true,
    // },
    // description: {
    //     type: String,
    //     required: true,
    // },
    i18n: [{}],
    headerImage: {
        type: String,
        // required: true,
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Schedule',
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
}, { timestamps: true });


const TOUR = mongoose.model('Tour', tourSchema);
export default TOUR;