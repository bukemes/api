import mongoose, { Schema, Document } from 'mongoose'; // Types

export interface SchemaInput {
    title: string;
    description: string;
    available: Array<string>;
}

export interface SchemaDocument extends SchemaInput, Document {
    updatedAt: Date;
    createdAt: Date;
}

const scheduleSchema = new Schema<SchemaDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    available: [String]
}, { timestamps: true });


const SCHEDULE = mongoose.model('Schedule', scheduleSchema);
export default SCHEDULE;