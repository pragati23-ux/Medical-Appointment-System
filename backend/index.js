import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
dotenv.config()
const app =express()
const Port=process.env.Port || 8000
const corsOptions={
    origin:true,
}
app.get("/",(req,res)=>{
    res.send("hello")
})
//databaseconnection
mongoose.set('strictQuery',false)
const connectDB=async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected");

    }
    catch(err){
        console.log("dataabse not connected",err)


    }
}
//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/doctors',doctorRoute)
app.use('/api/v1/review',reviewRoute)

app.listen(Port,()=>{
    connectDB();
console.log("server is running"+Port);
})