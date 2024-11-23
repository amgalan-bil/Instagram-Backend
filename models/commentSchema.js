const {mongoose, Schema} = require("mongoose")

const commentSchema = new Schema ({
    userId : {type: mongoose.Types.ObjectId, ref: "users" ,required: true},
    comment: {type: String, required: true},
    postId: {type: mongoose.Types.ObjectId, ref: "posts" ,required: true}
},
{
    timestamps: true
})


const commentModel = mongoose.model("comment", commentSchema)

module.exports = commentModel;
