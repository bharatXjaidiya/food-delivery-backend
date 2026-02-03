import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
export const connectToDb =async()=>{
    let a = await mongoose.connect(process.env.mongoURL)
    console.log("db is connected")
} 