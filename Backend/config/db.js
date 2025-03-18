//mongodb password:dbuser123
const mongoose=require('mongoose');
require('dotenv').config();
const mongo_url=process.env.MONGO_CONN;
mongoose.connect(mongo_url)
        .then(()=>{
            console.log("Mongo DB connected successfully");
        }).catch((err)=>{
            console.log("Error in connecting to DB",err);
        })