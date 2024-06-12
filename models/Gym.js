const mongoose = require('mongoose');

const gymSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{
    timestamps:true
})

const Gym=mongoose.model("Gym",gymSchema);

module.exports=Gym;