import express from 'express'
import { loginUser, registerUser ,getInfo } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRoute = express.Router();

userRoute.post('/register',registerUser);
userRoute.post('/login',loginUser);
userRoute.post('/getInfo',authMiddleware,getInfo)
export {userRoute}