const Gym=require('../models/Gym');
const asyncHandler=require('express-async-handler');

const addGym=asyncHandler(async(req,res)=>{
    console.log(req.user)
    const {name,description,photos,location,annual_membership_fees}=req.body;

    if(!name || !description || !photos || !location || !annual_membership_fees){
        res.send("Please fill all the details")
    }
    try{
    var newGym={
        user:req.user._id,
        name:name,
        description,
        location,
        photos,annual_membership_fees
    }
    var gym= await Gym.create(newGym);
     console.log(gym);
    if(gym){
        res.status(200).json({
            message:"Gym Created Successfully"
        })
    }else{
        res.status(401);
        throw new Error("Failed to add gym");
    }
}catch(err){
    res.status(400);
    throw new Error("Some error occured");
}
});

const fetchGym=asyncHandler(async(req,res)=>{
    try{
    const userId=req.user._id;
    const gym=await Gym.findOne({user:userId});
    if(!gym){
        res.json({message:"There is no gym"});
        return ;
    }
    res.status(200).json(gym);

}catch(err){
    res.status(400);
    throw new Error("Some error occured");
}
})

const updateGym=asyncHandler(async(req,res)=>{

    try{
    const userId=req.user._id;
    const {name,description,photos,location,annual_membership_fees}=req.body;

    const updateGym=await Gym.findOneAndUpdate({user:userId},{name,description,photos,location,annual_membership_fees});
    
    if(updateGym){
        res.status(200).json({
            message:"Gym Updated Successfully",updateGym
        });
    }
}catch(err){
    res.status(400);
    throw new Error("Some error occured");
}
});


const deleteGym=asyncHandler(async(req,res)=>{
    try{
    const userId=req.user._id;

    await Gym.findOneAndDelete({user:userId});
    
    res.status(200).json({message:"Gym deleted successfully"});
}catch(err){
    res.status(400);
    throw new Error("Some error occured");
}
});

module.exports={addGym,fetchGym,updateGym,deleteGym};
