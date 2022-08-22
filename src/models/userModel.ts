import { Document, model, Model, Schema } from 'mongoose';
export interface ILogin {
    email: string;
    password: string;
}

export interface IUser extends ILogin {
    tos: boolean;
    role?: string;
    name?: string;
    pfp?: string;
}

export interface IUserDocument extends IUser, Document {
    updatedAt: Date;
    createdAt: Date;
}
type UserModel = Model<IUserDocument>

const UserSchema = new Schema<IUserDocument, UserModel>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    tos: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
    },
    pfp: {
        type: String,
    },
}, { timestamps: true });


const USER = model<IUserDocument, UserModel>('User', UserSchema);
export default USER;