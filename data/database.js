import mongoose from "mongoose";

export const connectDB =()=> { 
   mongoose.connect(process.env.MONGO_URL,{
   dbName:"todoApp",
}).then(()=>console.log(`DB connected  ${process.env.MONGO_URL}`))
.catch((e)=>console.log(e));
}