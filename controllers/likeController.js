const postModel = require("../models/postSchema");

const likePost = async(req, res)=>{

    const{personThatLikesId, postThatGetLikedId} = req.body


    try{

        await postModel.findByIdAndUpdate(postThatGetLikedId, {
            
            $addToSet: {
                like: personThatLikesId
            }
            
        })


        res.status(200).send("liked post")
    }catch(err){
        throw new Error(err)
    }
}

const getLike = async(req, res)=>{
    try{
        const likedPost = await postModel.find().populate("like", "username email password")

        res.status(200).send(likedPost)
    }catch(err){
        throw new Error(err)
    }
}


const unLike = async(req, res)=>{
    const {personThatUnlikes, postThatGetUnlike} = req.body
    
    try{
        await postModel.findByIdAndUpdate(postThatGetUnlike,{
            $pull:{
                like: personThatUnlikes
            }
        })
        res.status(200).send("unliked post")
    }catch(err){
        throw new Error(err)
    }
}

module.exports = {likePost, getLike, unLike}