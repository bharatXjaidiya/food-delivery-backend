import mongoose from "mongoose"
import fs from "fs"
import foodModel from "../models/foodModels.js"

export const addFood =async (req,res)=>{
    const food = new foodModel({
    name: req.body.name
    , image: req.file.filename
    , price: req.body.price
    , description: req.body.description
    , category: req.body.category
    }) 

    try{
        await food.save();
        res.json({success:true,message:"Food added succesfully"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export const removeFood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${req.body.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food remove succesfully"});
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}  

export const foodList = async(req,res)=>{
    try{
        const food = await foodModel.find({})
        res.json({success:true,data:food})
    }
    catch(error){
        res.json({success:false,message:"Error"})
    }
}

