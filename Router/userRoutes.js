const {Router} = require("express")
const userModel = require("../models/userSchema")
const bcrypt = require("bcrypt");
const postModel = require("../models/postSchema");
const likeModel = require("../models/likeSchema")

const userRoute = Router();

userRoute.post("/signup", async (req, res)=>{
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

        res.status(200).send(createUser)
    }catch(err){
        console.log(err)
    }

})

userRoute.get("/users", async(req,res)=>{

    try{
        const user = await postModel.find().populate("userId")
        res.status(200).send(user)
    }catch(err){
        res.status(500).send(err)
        console.log(err)
    }

})

userRoute.post("/comment", async(req, res)=>{
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

userRoute.get("/comment/get", async(req, res)=>{
    try{
        const comment = await postModel.find().populate("comment")
        res.status(200).send(comment)
    }catch(error){
        res.status(500).send(error)
    }
})


userRoute.post("/follow" , async(req,res)=>{
    try{
        const {personThatFollowsId, personThatGetFollowedId} = req.body

        await userModel.findByIdAndUpdate(personThatFollowsId, {
            $push: {
                following: personThatGetFollowedId,
            }
        })

        await userModel.findByIdAndUpdate(personThatGetFollowedId,{
            $push:{
                follower: personThatFollowsId,
            }
        })

        res.status(200).send("followed")

    }catch(err){
        res.status(500).send(err)
    }
})


userRoute.post("/unfollow" , async(req, res)=>{
    try{
        const{personThatUnfollowsId, personThatGetUnfollowedId} = req.body

        await userModel.findByIdAndUpdate(personThatUnfollowsId, {
            $pull: {
                following: personThatGetUnfollowedId,
            }

        })

        await userModel.findByIdAndUpdate(personThatGetUnfollowedId, {
            $pull: {
                follower: personThatUnfollowsId
            }

        })

        res.status(200).send("unfollowed")
    }catch(err){
        throw new Error(err)
    }
})

userRoute.post("/like", async(req, res)=>{

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
})

userRoute.get("/like/get", async(req, res)=>{
    try{
        const likedPost = await postModel.find().populate("like", "username email password")

        res.status(200).send(likedPost)
    }catch(err){
        throw new Error(err)
    }
})


userRoute.post("/unlike", async(req, res)=>{{
    const {personThatUnlikes, postThatGetUnlike} = req.body
    
    try{
        await postModel.findByIdAndUpdate(postThatGetUnlike,{
            $pull:{
                like: personThatUnlikes
            }
        })
        res.status(200).send("unliked")
    }catch(err){
        throw new Error(err)
    }
}})

module.exports = userRoute;