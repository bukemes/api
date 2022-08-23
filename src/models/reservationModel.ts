import mongoose, { Schema, Document } from 'mongoose'; // Types

export interface IReservationData {
    userId: mongoose.Types.ObjectId;
    tourId: mongoose.Types.ObjectId;
    isApproved?: boolean;
    date: Date; // or string
}

export interface ReservationDocument extends IReservationData, Document {
    updatedAt: Date;
    createdAt: Date;
}

const reservationSchema = new Schema<ReservationDocument>({
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