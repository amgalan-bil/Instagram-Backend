const userModel = require("../models/userSchema")
const bcrypt = require("bcrypt");
const postModel = require("../models/postSchema");


const addUser = async (req, res)=>{
    try{
        const body = req.body
        const { username, password, email, profileImage, bio, post} = body;

        const hash = await bcrypt.hashSync(password, 10)

        const createUser = await userModel.create({
            "username": username,
            "password": hash,
            "email": email,
            "profileImage": profileImage,
            "bio": bio,
            "post": post,
        })
        await postModel.findByIdAndUpdate(post,{
            $push:{
                posts: createUser._id,
            }
        })

        res.status(200).send("created user")
    }catch(err){
        console.log(err)
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