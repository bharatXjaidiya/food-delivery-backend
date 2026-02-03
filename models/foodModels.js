import mongoose from 'mongoose';
const { Schema } = mongoose;

const foodSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true } 
});

const foodModel = mongoose.model('foods', foodSchema);

export default foodModel;
