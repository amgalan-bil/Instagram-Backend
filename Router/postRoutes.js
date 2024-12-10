const {Router} = require("express")
const {createPost, getPost} = require("../controllers/postController")

const postRouter = Router()

postRouter.post("/post", createPost)
postRouter.get("/posts/:postId", getPost)

module.exports = postRouter;