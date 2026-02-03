import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,uniqe:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

 const userModel = mongoose.models.user || mongoose.model('users',userSchema);
 export default userModel;