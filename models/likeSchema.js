const {Schema, mongoose} = require("mongoose")

const likeSchema = new Schema({
    userId : {type: mongoose.Types.ObjectId, ref: "users"},
    postId: {type: mongoose.Types.ObjectId, ref: "posts"}
},
{
    timestamps:true
})

const likeModel = mongoose.model("like", likeSchema)

module.exports = likeModel;