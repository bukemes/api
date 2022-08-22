import mongoose, { Schema, Document } from 'mongoose'; // Types

export const mediaSizes = ['_small', '_medium', '_large'];

export interface IMediaInput {
    title: string;
    filename: string;
    description?: string;
}

export interface IMediaDocument extends IMediaInput, Document {
    updatedAt: Date;
    createdAt: Date;
}

// interface IMediaModel extends Model<IMediaDocument> {
//     signup(input: IUser): Promise<string>;
//     login(input: ILogin): Promise<string>;
//     logout(email: string): string;
//     refresh(session: string, token: object): Promise<string>;
//   }

const mediaSchema = new Schema<IMediaDocument>({
    title: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true });

const MEDIA = mongoose.model('Media', mediaSchema);
export default MEDIA;