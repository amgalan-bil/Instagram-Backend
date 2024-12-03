const commentModel = require("../models/commentSchema")
const postModel = require("../models/postSchema");


const addComment = async(req, res)=>{
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

        res.status(200).send("created comment")
    }catch(error){
        throw new Error(error)
    }
}

const getComment = async(req, res)=>{
    try{
        const comment = await postModel.find().populate("comment")
        res.status(200).send(comment)
    }catch(error){
        res.status(500).send(error)
    }
}


module.exports = {addComment, getComment}

