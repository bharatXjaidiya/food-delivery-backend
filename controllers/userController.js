import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'
import 'dotenv/config.js'
//login user
export const loginUser = async (req, res) => { 
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn't exit"})
        }
        else{
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.json({success:false,message:"Invalid credentials"})
            }
            else{
                const token = createToken(user._id);
                res.json({success:true,token})
            }
        }
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    } 
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user
export const registerUser = async (req, res) => {
    const {name , email ,password} = req.body;
    try{
        //checking is user already exists
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success:false,message:"User already exists"})
        }
        //validating email format & password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt) 

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})
    }
    catch(error){  
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export const getInfo = async(req,res)=>{    
    try{
        const user = await userModel.findById(req.user)
        const {name , email} = user;
        const data ={name,email}
        res.json({success:true,data})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
} 