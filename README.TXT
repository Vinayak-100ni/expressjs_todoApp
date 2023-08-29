.....error handling in Node.js..........

4:56:24


if we call next in router and there is no next call function then it will show an error function.

for creating that we have to create a middleware called "error"

app.use((err,req,res,next)=>{

   return res.status(404).json({
        success:false,
        message:err.message,
    });
});

....................EX.................

...................

    if(!task) return next(new Error("Task doesn't exist"));

..........

5:01:

create a errorHandler class which is extended from Error.


class ErrorHandler extends Error {
    constructor(message,statusCode){ 
    super(message);
    this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err,req,res,next)=>{

    err.message = err.message || "INTERNAL SERVER ERROR";
        return res.status(404).json({
              success:false,
              message:err.message,
          });
}

export default ErrorHandler;

At app.js  //middleware handler.."

app.use(errorMiddleware);

At controller use as..........

...................Ex..............
  if(!task) return next(new ErrorHandler());