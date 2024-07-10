const User=require('../models/User');
const generateToken=require('../config/generateToken');
const asyncHandler=require('express-async-handler');

const registerUser=asyncHandler(async (req,res)=>{
    
    const {email,name,password,gymName,ownerName,photos,description,location}=req.body;
    if(!email || !name || !password || !gymName || !ownerName || !photos || !description || !location){
        throw new Error("Fill all the details");
        
    }

    const userExists=await User.findOne({email});

    if(userExists){
        throw new Error("User already exists");
    }

    const user=await User.create({
        name,
        email,
        password,
        gymName,
        ownerName,
        photos,
        description,
        location
    });

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            gymName:user.gymName,
            ownerName:user.ownerName,
            photos:user.photos,
            description:user.description,
            location:user.location,
            token:generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error("Failed To create user");
    }
})


const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(user && user.matchPassword(password)){
      
        return res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            gymName:user.gymName,
            ownerName:user.ownerName,
            photos:user.photos,
            description:user.description,
            location:user.location,
            token:generateToken(user._id) 
        })
        
    }else{

        throw new Error("User doesn't exist");
    }
})

const updateUser=asyncHandler(async(req,res)=>{
    try{
    const {gymName,ownerName,description,location,photos,userId,annual_subscription_price,male_female_allow,no_of_trainer_available,gym_equipments,timing,total_occupancy}=req.body;
     const updatedUserDetails=await User.findOneAndUpdate({_id:userId},{gymName,ownerName,description,location,photos,annual_subscription_price,male_female_allow,no_of_trainer_available,gym_equipments,timing,total_occupancy},{new:true});
     if(updatedUserDetails){
        res.status(200).json({
            message:"Gym Updated Successfully",updatedUserDetails
        });
    }
    }catch(err){
        res.status(400);
    throw new Error("Some error occured");
    }

})

module.exports={registerUser,authUser,updateUser};