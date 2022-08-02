import { Request, Response } from 'express';
import Tour from '../models/tourModel';
import mongoose from 'mongoose';

const getTours = async (req: Request, res: Response) => {
    const tours = await Tour.find({}).sort({ createdAt: 'desc' });
    return res.status(200).json(tours);
};

const getTourById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const tour = await Tour.findById(id);

    if (!tour) {
        return res.status(404).json({
            message: 'Tour not found',
        });
    }

    return res.status(200).json({
        tour,
    });
};

const createTour = async (req: Request, res: Response) => {
    const {
        title,
        description,
        headerImage,
        duration,
    } = req.body;

    try {
        const tour = await Tour.create({
            title, description, headerImage, duration,
        });
        res.status(201).json(tour);
    } catch (error) {
        let message: string;
        if (error instanceof Error){
            message = error.message;
            res.status(400).json({ error: message });
        }
    }
};

export {
    createTour,
    getTours,
    getTourById,
};
