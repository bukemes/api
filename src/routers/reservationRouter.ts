import express from 'express';
import mongoose from 'mongoose';
// utilities
import { CustomError, ErrorResponse} from '../utilities/error';
import logger from '../utilities/logger';
// auth
import { requireAuth } from '../middleware/requireAuth';
import { requireAdmin } from '../middleware/requireAdmin';
// models
import RESERVATION from '../models/reservationModel';

const reservationRouter = express.Router();

// auth middleware
reservationRouter.use(requireAuth);
reservationRouter.use(requireAdmin);

// routes
reservationRouter.get('/', async (req, res) => {
    RESERVATION.find({}).sort({ createdAt: 'desc' }).then((data) => {
        // console.log(data);
        res.status(200).json(data);
    }).catch(err => {
        logger.error(err);
        const error = new CustomError({
            code: 500,
            type: 'Internal Server Error',
            message: 'Could\'t save new Schedule'
        });
        ErrorResponse(error, res);
    });
});

reservationRouter.post('/', async (req, res) => {
    console.log(req.body);

    RESERVATION.create(req.body).then((data) => {
        res.status(200).json(data);
    }).catch(err => {
        logger.error(err);
        const error = new CustomError({
            code: 500,
            type: 'Internal Server Error',
            message: 'Could\'t save new Schedule'
        });
        ErrorResponse(error, res);
    });
});

reservationRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const media = await RESERVATION.findByIdAndDelete(id);

    return res.status(200).json({media});
});

export default reservationRouter;