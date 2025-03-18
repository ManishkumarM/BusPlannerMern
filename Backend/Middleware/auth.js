const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwt_SECRET_Key=process.env.jwt_SECRET_Key;
const ensureAuthenticated=(req,res,next)=>{
 const auth=req.headers['authorization'];
 if(!auth){
     return res.status(401).json({
        message:"Unauthorized, JWT Token required"
    });
 }
 try{
   const decoded=jwt.verify(auth,jwt_SECRET_Key);
   req.user=decoded;
   next();
 }catch(err){
     res.status(401).json({
        message:"Unauthorized, JWT Token is wrong or expired"
    })
 }
}
module.exports={
    ensureAuthenticated,
}