import express from "express"
import cors from "cors"
import { connectToDb } from "./config/db.js";
import { foodRoute } from "./routes/foodRouter.js";
import {userRoute} from "./routes/userRouter.js"
import {cartRouter} from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js";

//app config
const app = express();
const port = 4000;

//middle wares
app.use(express.json())
app.use(cors())

//connecting to db
connectToDb()
 
//api endpoints
app.get("/", (req, res) => {
    res.send("API Working");
})
app.use("/api/food", foodRoute);//“Mount point based middleware”
app.use("/images", express.static('uploads'))
app.use("/api/user",userRoute);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port, () => {
    console.log("server is listing http://localhost:" + port)
})

