const userModel = require("../models/userSchema")
const bcrypt = require("bcrypt");
const postModel = require("../models/postSchema");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const addUser = async (req, res)=>{
    const body = req.body
    const { username, password, email} = body;
    
    try{
        const hash = await bcrypt.hashSync(password, 10)

        const createUser = await userModel.create({
            "username": username,
            "password": hash,
            "email": email,
        })
        await postModel.findByIdAndUpdate(post,{
            $push:{
                posts: createUser._id,
            }
        })
        
        const token = jwt.sign({
            userId: createUser._id,
            username: createUser.username
        },
        process.env.JWT_PASS,
        {expiresIn: '24h'})

        res.status(200).send({token})
    }catch(err){
        res.send({message:`failed to create a user, ${err}`})
    }

}


const getUser = async(req,res)=>{

    try{
        const user = await postModel.find().populate("userId")
        res.status(200).send(user)
    }catch(err){
        res.status(500).send(err)
        console.log(err)
    }

}


module.exports = {addUser, getUser}