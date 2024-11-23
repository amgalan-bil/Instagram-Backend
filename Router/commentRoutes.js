const {Router} = require("express")
const postModel = require("../models/postSchema")
const userModel = require("../models/userSchema")
const commentModel = require("../models/commentSchema")

const commentRouter = Router()

commentRouter.post("/comment", async(req, res)=>{
    const {userId, comment, postId} = req.body

    try{
        const createComment = await commentModel.create({
            "userId": userId,
            "comment": comment,
            "postId": postId
        })

        await postModel.findByIdAndUpdate(postId, {
            $push:{
                comment: createComment._id
            }
        })

        res.status(200).send("success")
    }catch(error){
        throw new Error(error)
    }
})


commentRouter.get("/comment/get", async(req, res)=>{
    try{
        const comment = await postModel.find().populate("comment")
        res.status(200).send(comment)
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = commentRouter