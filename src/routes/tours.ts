/*
  @swagger
   components:
     schemas:
       Book:
         type: object
         required:
           - title
           - author
           - finished
         properties:
           id:
             type: integer
             description: The auto-generated id of the book.
           title:
             type: string
             description: The title of your book.
           author:
             type: string
             description: Who wrote the book?
           finished:
             type: boolean
             description: Have you finished reading it?
           createdAt:
             type: string
             format: date
             description: The date of the record creation.
         example:
            title: The Pragmatic Programmer
            author: Andy Hunt / Dave Thomas
            finished: true
*/

import express from 'express';
// import Tour from '../models/tourModel';
import { getTours, getTourById, createTour } from '../controllers/tourController';

//docs
import { Application, Request, Response } from 'express';
import { OpenApi, textPlain } from 'ts-openapi';


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
