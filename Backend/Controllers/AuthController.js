const UserModel=require("../Models/user");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const jwt_SECRET_Key='1234';
const signup =async (req,res)=>{
   try{
    const {name,email,password}=req.body;
    const user =await UserModel.findOne({email})
    if(user){
        return res.status(409)
        .json({message :"User is already exist, you can login",success:false})
    }
    const userModel=new UserModel({name,email,password});
    userModel.password=await bcrypt.hash(password,10);
    userModel.save();
    res.status(201)
        .json({message :"Signup successfully",success:true})
   }
   catch(err){
    res.status(500)
        .json({message :"Internal server error",success:false})
   }
};

const login =async (req,res)=>{
    try{
     const {email,password}=req.body;
     const user =await UserModel.findOne({email});
     const errorMsg="Auth failed email or password";
     if(!user){
         return res.status(403)
         .json({message :errorMsg,success:false})
     }
     const isPassEqual= await bcrypt.compare(password,user.password);
     if(!isPassEqual){
        return res.status(403)
        .json({message :errorMsg,success:false})
     }
     const jwttoken=jwt.sign({email:user.email,_id:user._id},jwt_SECRET_Key,{expiresIn:'24h'})
     res.status(200)
         .json({message :"Login successful",success:true,jwttoken,email,name:user.name,user})
    }
    catch(err){
     res.status(500)
         .json({message :"Internal server error",success:false})
    }
 };

module.exports={
    signup,
    login,
}