import { Request, Response } from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import logger from '../utilities/logger';
import { CustomError, ErrorResponse } from '../utilities/error';
// models
import MEDIA, { IMediaInput } from '../models/mediaModel';

export const getMedia = async (req: Request, res: Response) => {
    const media = await MEDIA.find({}).sort({ createdAt: 'desc' });
    return res.status(200).json(media);
};
  
export const uploadMedia = async (req: Request, res: Response) => {
    const tempPath = req?.file?.path as string;
    // logger.warn(tempPath);
    const {
        title,
        description,
        type
    }: any = req.query;
    
    if(!title || !type) {
        const error = new CustomError ({
            code: 400,
            type: 'Bad Request',
            message: 'Not all fields were filled out',
        }); 
        ErrorResponse(error, res);
    }
    
    const metadata: Array<string> = type?.split('/');
    
    if(metadata[0] === 'image') {
        const newPath = `${tempPath}.${metadata[1]}`;

        const newImage: IMediaInput = {
            title,
            filename: `${req?.file?.filename}.${metadata[1]}`,
            description: description || '',
        };

        try {
            const savedImage = await MEDIA.create(newImage);

            fs.rename(tempPath, newPath, err => {
                if (err) {
                    res.status(500).json({ 'error': err });
                }
                res.status(200).json({ image: savedImage });
            });

        } catch (error) {
            let message: string;
            if (error instanceof Error){
                message = error.message;
                res.status(400).json({ error: message });
            }
        }
    } else {
        const error = new CustomError ({
            code: 400,
            type: 'Bad Request',
            message: `You have tried uploading a ${type}. \n Only .jpg & .png are supported on this endpoint.`,
        }); 
        ErrorResponse(error, res);
    }    
};

export const editMedia = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const media = await MEDIA.findById(id);
    media?.replaceOne(req.body);

    return res.status(200).json({test});
};

export const deleteMediaById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    const media = await MEDIA.findByIdAndDelete(id);

    return res.status(200).json({media});
};