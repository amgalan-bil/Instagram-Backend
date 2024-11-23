const {Router} = require("express")
const postModel = require("../models/postSchema")
const userModel = require("../models/userSchema")

const postRouter = Router()

postRouter.post("/post", async(req,res)=>{
    try{
        const body = req.body
        const {caption, userId, profileImage} = body

        const createPost = await postModel.create({
            "caption": caption,
            "userId": userId,
            "profileImage": profileImage
        })
        await userModel.findByIdAndUpdate(userId,{
            $push:{
                posts: createPost._id,
            }
        })
        res.status(200).send(createPost)
    }catch(err){
        console.log(err)
    }
})


postRouter.get("/posts", async (req,res)=>{
    try{
        const post = await postModel.find().populate("comment")
        res.status(200).send(post)
    }catch(err){
        res.status(500).send(err)
        console.log(err)
    }
})

module.exports = postRouter;