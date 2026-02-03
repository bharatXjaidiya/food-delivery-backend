import express from 'express'
import multer from 'multer'
import { addFood, foodList, removeFood } from '../controllers/foodController.js';
const foodRoute = express.Router(); 

// storage engine of multer -> where to store and what is the name of the file/img
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    return cb(null,`${Date.now()}${file.originalname}`)
  }
})

const upload = multer({ storage: storage })
//add food
foodRoute.post("/add",upload.single("image"),addFood);
//food list
foodRoute.get("/list",foodList)
//remove food
foodRoute.post("/remove",removeFood)

export {foodRoute} 