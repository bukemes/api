import express from 'express';
// import Tour from '../models/tourModel';
import { getTours, getTourById, createTour } from '../controllers/tourController';

const toursRouter = express.Router();

// GET
toursRouter.get('/', getTours);
toursRouter.get('/:id', getTourById);

// POST
toursRouter.post('/', createTour);

// DELETE all of a type
toursRouter.delete('/', (req, res) => {
    res.json({ mssg: 'DELETE all tours' });
});

toursRouter.delete('/:id', (req, res) => {
    res.json({ mssg: 'DELETE a specific tour' });
});

// PUT
toursRouter.put('/', (req, res) => {
    res.json({ mssg: 'Update all tours (eg add new field to all)' });
});

toursRouter.put('/:id', (req, res) => {
    res.json({ mssg: 'Update a specific tour' });
});

export default toursRouter;
