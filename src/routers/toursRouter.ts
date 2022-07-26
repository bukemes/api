import express from 'express';
import { getTours, getTourById, createTour } from '../controllers/toursController';
/**
 * @openapi
 * tags: 
 *   name: Tours
 *   description: Tour operations
 */

/**
 * @openapi
 * components:
 *   schemas:
 *    Tour:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - duration
 *      properties:
 *        _id:
 *          type: string
 *          description: generated by mongoDB | the unique identifier of the document
 *        title:
 *          type: string
 *          description: title of the tour
 *        description:
 *          type: string
 *          description: description of the tour
 *        duration:
 *          type: number
 *          description: duration in minutes
 *        createdAt:
 *          type: Date
 *          description: generated by mongoDB | time of document creation
 *        updatedAt:
 *          type: Date
 *          description: generated by mongoDB | last time the document was updated
 *      example:
 *        _id: 62e3b68f338c3093dcbe4ade
 *        title: The Forest Hiker
 *        description: A tour of the forest
 *        duration: 45
 *        createdAt: ISODate('2022-07-29T10:29:35.323Z'),
 *        updatedAt: ISODate('2022-07-29T10:29:35.323Z'),
 *    Tour_Create:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - duration
 *      properties:
 *        title:
 *          type: string
 *          description: title of the tour
 *        description:
 *          type: string
 *          description: description of the tour
 *        duration:
 *          type: number
 *          description: duration in minutes
 *      example:
 *        title: The Forest Hiker
 *        description: A tour of the forest
 *        duration: 45
 */
const toursRouter = express.Router();

/**
 * @openapi
 * /tours:
 *  get:
 *    tags: [Tours]
 *    summary: Retrive a list of all tours
 *    description: Retrieve a JSON array of all published tours
 *    responses:
 *      200:
 *        description: sucessfully retrived the list of published tours
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Tour'
 */
toursRouter.get('/', getTours);

/**
 * @openapi
 * /tours/{id}:
 *  get:
 *    tags: [Tours]
 *    summary: Retrive a specific Tour
 *    description: Retrieve a specific Tour by providing its identifier.
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: mongoDB's identifier of the tour to return
 *        schema:  
 *          type: string
 *          example: 62e9a22be97652d0a5b89eb6
 *    responses:
 *      200:
 *        description: sucessfully retrived the list of published tours
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Tour'            
 *      404:
 *        description: A tour with the provided id was not found
 *      400:
 *        description: Invalid ID provided
 */
toursRouter.get('/:id', getTourById);

/**
 * @openapi
 * /tours:
 *   post:
 *     tags: [Tours]
 *     summary: Create a new tour
 *     description: POST a valid JSON object of a new tour to store it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour_Create'
 *     responses:
 *       201:
 *         description: Returns the newly created tour in the response body in JSON format
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Tour'  
 *       400:
 *         description: Bad request, returns the error message in the response body in JSON format
 *       401:
 *         description: Unauthorized
 *       404:
 *        description: No tour with that ID found
 *       500:
 *        description: Internal server error
 */
toursRouter.post('/', createTour);

// DELETE all of a type
toursRouter.delete('/', (req, res) => {
    res.json({ mssg: 'DELETE all tours' });
});

toursRouter.delete('/:id', (req, res) => {
    res.json({ mssg: 'DELETE a specific tour' });
});

/**
 * @openapi
 * /tours/{id}:
 *   put:
 *     tags: [Tours]
 *     summary: Create a new tour
 *     description: POST a valid JSON object of a new tour to store it in the database
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: mongoDB's identifier of a specific tour
 *         schema:  
 *           type: string
 *           example: 62e9a22be97652d0a5b89eb6
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour_Create'
 *     responses:
 *       204:
 *         description: Returns the updated tour in the response body in JSON format
 *       400:
 *         description: Bad request, returns the error message in the response body in JSON format
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: internal server error
 */
toursRouter.put('/', (req, res) => {
    res.json({ mssg: 'Update all tours (eg add new field to all)' });
});

toursRouter.put('/:id', (req, res) => {
    res.json({ mssg: 'Update a specific tour' });
});

export default toursRouter;
