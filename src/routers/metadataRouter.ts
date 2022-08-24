import express from 'express';
// auth
import { requireAuth } from '../middleware/requireAuth';
import { requireAdmin } from '../middleware/requireAdmin';
// models
import TOUR from '../models/tourModel';
import MEDIA from '../models/mediaModel';
import SCHEDULE from '../models/scheduleModel';

const metadataRouter = express.Router();

// auth middleware
metadataRouter.use(requireAuth);
metadataRouter.use(requireAdmin);

// routes
metadataRouter.get('/counters', async (req, res) => {
    const media = await MEDIA.find({}).countDocuments();
    const tours = await TOUR.find({}).countDocuments();
    const schedules = await SCHEDULE.find({}).countDocuments();

    const counters = {
        media,
        tours,
        schedules
    };

    res.status(200).json(counters);
});

export default metadataRouter;