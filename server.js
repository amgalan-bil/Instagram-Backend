const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const PORT = 4444
const cors = require("cors")

app.use(cors())
app.use(express.json())

dotenv.config()

const userRouter = require("./Router/userRoutes")
const postRouter = require("./Router/postRoutes")

const connectToDB = async()=>{
    try{
        const res = await mongoose.connect(process.env.MONGODB_URI);

        if(res){
            console.log("connected")
        }
    }catch(error){
        console.log(error)
        console.log("failed to connect to DB")
    }
}

connectToDB();

app.use(userRouter)
app.use(postRouter)

app.listen(PORT, console.log(`Connected at port ${PORT}`))
