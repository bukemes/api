/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

function isValidID(id: any) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return true;
    } 
    return false;
}

function isValidJSON(json: any): boolean {
    if(typeof(json) !== 'string') {
        console.log(typeof(json));
        return false;
    } else {
        try {
            const x = JSON.parse(json);
            if(typeof(x) === 'object') {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

const handleBodyParserErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: (err as any).message }); // Bad request
    } else if (err instanceof SyntaxError && 'body' in err) {
        console.error(err);
        return res.status(500).send({ status: 500, message: 'Internal server error' }); // Internal server error
    }
    next();
};

export {
    isValidID,
    isValidJSON,
    handleBodyParserErrors,
};
