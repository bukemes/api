import mongoose, { Schema } from 'mongoose';

const tourSchema = new Schema({
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

export default mongoose.model('Tour', tourSchema);
