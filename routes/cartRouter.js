import exptess from "express";
import { addCartItems, getCartItems, removeCartItem } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
const cartRouter = exptess.Router();

cartRouter.post("/add",authMiddleware, addCartItems);
cartRouter.post("/get",authMiddleware, getCartItems);    
cartRouter.post("/remove",authMiddleware, removeCartItem);

export {cartRouter}    