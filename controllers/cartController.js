import userModel from "../models/userModel.js";
  
export const addCartItems = async (req, res) => {
    try { 
        let userData = await userModel.findById(req.user);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.user, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export const removeCartItem = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId])
        cartData[req.body.itemId] -= 1;
        await userModel.findByIdAndUpdate(req.user,{cartData});
        res.json({success:true,message:"Removed From the Cart"});
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}

export const getCartItems = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

