const { mongoose, Schema} = require("mongoose")

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    profileImage: {type: String},
    bio: {type: String},
    posts: [{type: mongoose.Types.ObjectId, ref: "post"}],
    follower: [{type: mongoose.Types.ObjectId, ref: "user"}],
    following: [{type: mongoose.Types.ObjectId, ref: "user"}]
},
{timestamps:true}
)


const userModel = mongoose.model("users", userSchema)

module.exports = userModel;