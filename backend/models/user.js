const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        min:3,
        max:30
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true

    },

    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"buyer"
    }
},
{timestamps:true}
)

module.exports=mongoose.model("User", userSchema);