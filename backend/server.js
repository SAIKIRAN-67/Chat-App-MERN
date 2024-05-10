import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser";
const app=express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT || 5000;


app.get("/",(req,res)=>{
    res.send("Welcome to chat app");
})

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log("server is listening in port 5000 for chat app");
})

