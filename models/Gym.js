const mongoose = require('mongoose');

const gymSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    photos:[
        {
            type:String,

        }
    ],
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    annual_membership_fees:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Gym=mongoose.model("Gym",gymSchema);

module.exports=Gym;