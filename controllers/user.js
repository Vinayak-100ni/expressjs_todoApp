import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/errorHandler.js";


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User already exist", 404));

        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name, email, password: hashPassword,
        });

        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("User doesn't Exist", 404));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));

        sendCookie(user, res, `Wellcome back, ${user.name}`, 200);
    } catch (error) {
        
        next(error);
    }
};

export const getMydetail = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logout = (req, res) => {

    res
        .status(200)
        .cookie("token", "", { 
            expires: new Date(Date.now()),
           //sameSite and secure:true is used bcz server and backend domain is on diff. url. 
           sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",         
           secure: process.env.NODE_ENV === "Development" ? false : true,
         })
        .json({
            success: true,
            message: "LogOut Successfully",
        });
};
