import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const front_end_url = "http://localhost:5173"
//placing user order for fronted
export const placeOrder = async (req, res) => {
    try {
        //save order in DB
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        //creating line items
        const options = {
            amount: req.body.amount * 100, // convert to paise
            currency: "INR",
            receipt: "order_rcptid_" + newOrder._id,
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success:true,
            orderId:order.id,
            amount:order.amount,
            currency:order.currency
        });
        

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error")
    }
}

