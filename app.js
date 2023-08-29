import express from "express"
import userRouter from "./routes/user.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js"
import { errorMiddleware } from "./middlewares/errorHandler.js";
import cors from "cors"
 
export const app =express();

config({
    path:"./data/config.env",
});


//middlewares..........
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","DELETE","POST"],
    credentials:true, //for passing the cookies to frontend.....
}));
//using Routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

//middleware handler...
app.use(errorMiddleware);