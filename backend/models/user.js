const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
       
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },

    password:{
        type:String,
        required:true,
    },
    confirmPass:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:'buyer'
    }
},
{timestamps:true}
)

module.exports=mongoose.model("User", userSchema);