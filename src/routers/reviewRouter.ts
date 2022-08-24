import express from 'express';
import mongoose from 'mongoose';
// utilities
import { CustomError, ErrorResponse, ICustomError} from '../utilities/error';
import logger from '../utilities/logger';
// auth
import { requireAuth } from '../middleware/requireAuth';
// import { requireAdmin } from '../middleware/requireAdmin';
// models
import REVIEW from '../models/reviewModel';

const reviewRouter = express.Router();

// auth middleware

// routes by tour ID
reviewRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }
    REVIEW.find({tourId: id}).sort({ createdAt: 'desc' }).then((data) => {
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

reviewRouter.use(requireAuth);

reviewRouter.post('/', async (req, res) => {
    const review: any = {...req.body};
    review.email = res.locals.user.email;
    review.userId = res.locals.user._id;
    console.log(review);
    
    REVIEW.create(review).then((data) => {
        res.status(201).json(data);
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

// reservationRouter.delete('/:id', async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ error: 'Invalid id' });
//     }

//     const media = await RESERVATION.findByIdAndDelete(id);

//     return res.status(200).json({media});
// });

// reservationRouter.use(requireAdmin);

// reservationRouter.get('/', async (req, res) => {
//     RESERVATION.find({}).sort({ createdAt: 'desc' }).then((data) => {
//         res.status(200).json(data);
//     }).catch(err => {
//         logger.error(err);
//         const error = new CustomError({
//             code: 500,
//             type: 'Internal Server Error',
//             message: 'Could\'t save new Schedule'
//         });
//         ErrorResponse(error, res);
//     });
// });

// reservationRouter.put('/:id', async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ error: 'Invalid id' });
//     }

//     const data = req.body;

//     RESERVATION.findOneAndUpdate({ _id: id }, data)
//         .then(tour => {
//             return res.status(204).json(tour);
//         }).catch(err => {
//             logger.error(err);
//             const message: ICustomError = {
//                 code: 500,
//                 type: 'Internal Server Error',
//                 message: 'Unable to update tour',
//             };  const error = new CustomError (message);
//             return ErrorResponse(error, res);
//         });
// });


export default reviewRouter;