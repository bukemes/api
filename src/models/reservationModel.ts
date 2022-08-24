import mongoose, { Schema, Document } from 'mongoose'; // Types

export interface IReservationData {
    isApproved?: boolean;
    email: string,
    userId: mongoose.Types.ObjectId;
    tour: string;
    tourId: mongoose.Types.ObjectId;
    date: Date; // or string
}

export interface ReservationDocument extends IReservationData, Document {
    updatedAt: Date;
    createdAt: Date;
}

const reservationSchema = new Schema<ReservationDocument>({
    email: {
        type: String, 
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    tour: {
        type: String,
        required: true,
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tour',
        required: true,
    },
    isApproved: {
        type: Boolean,
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });


const RESERVATION = mongoose.model('Reservation', reservationSchema);
export default RESERVATION;