const {Router} = require("express")

const { addUser, getUser, login} = require("../controllers/userController")
const {addComment, getComment} = require("../controllers/commentController")
const {follow, unfollow} = require("../controllers/followController")
const {likePost, getLike, unLike} = require("../controllers/likeController")
// const checkToken = require("../middleware")

const userRoute = Router();

userRoute.post("/signup", addUser)
userRoute.post("/login", login)
userRoute.get("/users/:userId", getUser)

userRoute.post("/comment", addComment)
userRoute.get("/posts/comment/:postId", getComment)

userRoute.post("/follow" , follow)
userRoute.post("/unfollow" , unfollow)

userRoute.post("/like", likePost)
userRoute.get("/like/get/:likedUserId", getLike)
userRoute.post("/unlike", unLike)

module.exports = userRoute;