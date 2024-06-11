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

