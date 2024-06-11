const express= require('express');
const dotenv=require('dotenv');

const userRouter=require('./routers/userRouter');
const gymRouter= require('./routers/gymRouter');
const path=require('path');

// const chats=require('./data/data');
const connectDb = require('./config/db');

dotenv.config();

connectDb();

const app=express();

app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/gym',gymRouter);

const server=app.listen(process.env.PORT,()=>{
   
    console.log("Server is listening at 5000");
})