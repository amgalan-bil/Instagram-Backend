const { mongoose, Schema} = require("mongoose");

const postSchema = new Schema({
    caption: {type: String, required: true},
    profileImage: {type: String},
    userId: [{type: mongoose.Types.ObjectId, ref: "users" ,required: true}],
    comment: [{type: mongoose.Types.ObjectId, ref: "comment"}],
    like: [{type: mongoose.Types.ObjectId, ref:"users"}]
},
{
    timestamps:true
}
)


const postModel = mongoose.model("post", postSchema)

module.exports = postModel;