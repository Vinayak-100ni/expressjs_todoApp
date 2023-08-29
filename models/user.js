import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        select:false,
    },
    createdAt:{
        type:Date,
        require:true,
        default:Date.now,
    },
});

export const User = mongoose.model("User",schema);