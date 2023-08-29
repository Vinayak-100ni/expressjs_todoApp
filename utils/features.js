import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
           //sameSite and secure:true is used bcz server and backend domain is on diff. url. 
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",         
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            message,
        });
}