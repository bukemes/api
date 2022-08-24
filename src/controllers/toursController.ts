/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import TOUR, { InternationalTourInput } from '../models/tourModel';
import mongoose from 'mongoose';
import { CustomError, ErrorResponse, ICustomError } from '../utilities/error';
import logger from '../utilities/logger';

const getTours = async (req: Request, res: Response) => {
    const tours = await TOUR.find({}).sort({ createdAt: 'asc' });
    return res.status(200).json(tours);
};

const getTourById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const tour = await TOUR.findById(id);

    if (!tour) {
        return res.status(404).json({
            message: 'Tour not found',
        });
    }

    return res.status(200).json({
        tour,
    });
};

// only admins can do this
const createTour = async (req: Request, res: Response) => {
    const data: InternationalTourInput = req.body as InternationalTourInput;

    let missingProperties;
    if(!isValidTour(data, missingProperties)) {
        const message: ICustomError = {
            code: 400,
            type: 'Bad Request',
            message: 'All required fields must be filled',
            fields: missingProperties,
        };  const error = new CustomError (message);
        return ErrorResponse(error, res);
    }
    
    // base64 encode Rich Text
    // data.i18n.forEach(item => {
    //     item.description = Buffer.from(item.description).toString('base64');
    // });    

    try {
        const tour = await TOUR.create(data);
        return res.status(201).json(tour);
    } catch (err) {
        logger.error(err);
        const message: ICustomError = {
            code: 500,
            type: 'Internal Server Error',
            message: 'Unable to save tour',
        };  const error = new CustomError (message);
        return ErrorResponse(error, res);
    }
};

const deleteTourById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    try {
        const tour = await TOUR.findByIdAndDelete(id);
        if(tour) {
            return res.status(200).json(tour);
        }
        const message: ICustomError = {
            code: 400,
            type: 'Bad Request',
            message: 'No tour with provided ID was found',
        };  const error = new CustomError (message);
        return ErrorResponse(error, res);
    } catch (err) {
        logger.error(err);
        const message: ICustomError = {
            code: 500,
            type: 'Internal Server Error',
            message: 'Unable to Delete tour',
        };  const error = new CustomError (message);
        return ErrorResponse(error, res);
    }
};

const editTourById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const data: InternationalTourInput = req.body as InternationalTourInput;
    let missingProperties;
    if(!isValidTour(data, missingProperties)) {
        const message: ICustomError = {
            code: 400,
            type: 'Bad Request',
            message: 'All required fields must be filled',
            fields: missingProperties,
        };  const error = new CustomError (message);
        return ErrorResponse(error, res);
    }

    TOUR.findOneAndUpdate({ _id: id }, data)
        .then(tour => {
            return res.status(204).json(tour);
        }).catch(err => {
            logger.error(err);
            const message: ICustomError = {
                code: 500,
                type: 'Internal Server Error',
                message: 'Unable to update tour',
            };  const error = new CustomError (message);
            return ErrorResponse(error, res);
        });
};

const getPublishedTours = async (req: Request, res: Response) => {
    const tours = await TOUR.find({ isPublished: true }).sort({ createdAt: 'asc' });
    if(!tours) {
        const error: ICustomError = {
            code: 400,
            type: 'Bad Request',
            message: 'No tours found',
        }; 
        return res.status(error.code).json(error);
    }

    return res.status(200).json(tours);
};

const getPublishedToursById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }
    // const tours = await TOUR.find({ isPublished: true }).sort({ createdAt: 'asc' });
    const tour = await TOUR.findById(id);

    if (!tour) {
        const error: ICustomError = {
            code: 400,
            type: 'Bad Request',
            message: 'No tour with provided ID was found',
        };  return res.status(error.code).json(error);
    }

    if(!tour.isPublished) {
        const error: ICustomError = {
            code: 401,
            type: 'Unauthorized',
            message: 'Tour is not published',
        };  return res.status(error.code).json(error);
    }

    return res.status(200).json(tour);
};

export {
    createTour,
    getTours,
    getTourById,
    deleteTourById,
    editTourById,
    getPublishedTours,
    getPublishedToursById
};

const isValidTour = (input: any, missingProperties: any): input is InternationalTourInput => {

    const schema: Record<keyof InternationalTourInput, string> = {
        isPublished: 'boolean',
        i18n: 'array',
        headerImage: 'string',
        schedule: 'string',
        duration: 'number'
    };

    missingProperties = Object.keys(schema)
        .filter(key => input[key] === undefined)
        .map(key => key as keyof InternationalTourInput)
        .map(key => key.toString());
    // .map(key => `Document is missing ${key} ${schema[key]}`);
    return missingProperties.length === 0;
};   