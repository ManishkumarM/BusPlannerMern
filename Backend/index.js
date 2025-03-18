const express = require('express');
const app=express();
require('dotenv').config();
require('./config/db');
const bodyparser= require('body-parser');
const cors=require('cors');
const AuthRouter=require('./Router/auth-router');
console.log(process.env.PORT);
const PORT =process.env.PORT || 8080;
const productRouter=require('./Router/product-router');
const cityRouter=require('./Controllers/citiesController');
const busRouter=require('./Controllers/busController');
const seatRouter=require('./Controllers/seatController');
const paymentController=require('./Controllers/paymentController');
const orderController=require('./Controllers/ordersController');
app.use(bodyparser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',productRouter);
app.use('/city',cityRouter);
app.use('/bus',busRouter);
app.use("/api/payment", paymentController);
app.use("/order", orderController);
// app.use('/seat',seatRouter);
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})