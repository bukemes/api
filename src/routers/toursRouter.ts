import express from 'express';
import { getTours, getTourById, createTour } from '../controllers/tourController';

const toursRouter = express.Router();

toursRouter.get('/', getTours);

/**
 * @swagger
 * components:
 *   schemas:
 *    Tour:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - duration
 *      properties:
 *        id:
 *          type: string
 *          description: auto-generated mongoDB id
 *        title:
 *          type: string
 *          description: title of the tour
 *        description:
 *          type: string
 *          description: description of the tour
 *        duration:
 *          type: number
 *          description: duration in minutes
 */
toursRouter.get('/:id', getTourById);

// POST

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
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
