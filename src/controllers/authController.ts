
import { Request, Response } from 'express';
import User, {ILogin, IUser, IUserDocument} from '../models/userModel';
import CustomError from '../utilities/error';
import logger from '../utilities/logger';
import { createJWT, } from '../utilities/utils';
import { IJWT } from '../models/authModel';

const signupUser = async (req: Request, res: Response) => {

    const {
        email,
        password,
        name
    } = req.body;

    const newUser: IUser = {
        email,
        password,
        name
    };

    try {
        const user: IUserDocument = await User.signup(newUser);

        const data = {
            name: user.name,
            role: 'administrator'
        };

        const token = createJWT(data);


        res.status(200).json({user, token});
    } catch (err) {
        let message: string;
        if (err instanceof CustomError){
            message = err.message;
            res.status(400).json({ error: message });
        } else {
            logger.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
};

const loginUser = async (req: Request, res: Response) => {
    const {
        email,
        password
    } = req.body;
    
    const login: ILogin = {
        email,
        password,
    };
        
    try {
        const user = await User.login(login);

        const data = {
            name: user.name,
            role: 'admin',
            session: '49518510-53c9-48db-925b-a75144e2a148'
        };

        const token = createJWT(data);
        res.status(200).json(token);
    } catch (err) {
        let message: string;
        if (err instanceof CustomError){
            message = err.message;
            res.status(400).json({ error: message });
        } else {
            logger.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
};

const logoutUser = async (req: Request, res: Response) => {
    res.json({mssg: 'logout'});
};

export {
    loginUser,
    signupUser,
    logoutUser,
};
