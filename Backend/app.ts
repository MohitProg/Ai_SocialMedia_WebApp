import express from "express";
import { errorHandler } from "./middleware/error.middleware.js";
import AuthRouter from "./routes/auth.route.js"
import UserRouter from "./routes/user.route.js"
import cookieparser from "cookie-parser";
import PostRouter from "./routes/post.route.js"
import { SendOTPMail } from "./services/SendMailer.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())


// route handling 
app.use("/api/auth",AuthRouter);
app.use("/api/user",UserRouter);
app.use("/api/post",PostRouter);


// Global Error Handler (Always Last)
app.use(errorHandler);



export default app;