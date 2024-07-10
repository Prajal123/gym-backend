const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({
   name:{
      type:String,
      required:true
   },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gymName:{
        type:String,
        required:true
    },
    ownerName:{
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
    annual_subscription_price:{
        type:String
    },
    timing:{
        type:String
    },
    gym_equipments:{
        type:String
    },
    total_occupancy:{
        type:String
    },
    no_of_trainer_available:{
        type:String
    },
    male_female_allow:{
        type:String
    }
},{
    timestamps:true
})


userSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(this.password,password);
}

userSchema.pre("save",async function (next) {

    if(!this.isModified){
        next();
    }

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);


})
const userModel=mongoose.model("User",userSchema);


module.exports=userModel;

