import express from 'express';
import { loginUser, signupUser, logoutUser } from '../controllers/authController';

const authRouter = express.Router();

// signup
authRouter.post('/signup', signupUser);

// login
authRouter.post('/login', loginUser);

// logout
// this should invalidate the current code_challenges and other related tokens for that user.
authRouter.post('/logout', logoutUser);


export default authRouter;
