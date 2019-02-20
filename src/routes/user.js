import express from 'express';
import User from '../controllers/User';

const userRouter = express.Router();
const { signup, signin } = User;

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);

export default userRouter;
