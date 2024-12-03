const {Router} = require("express")
const {createPost, getPost} = require("../controllers/postController")

const postRouter = Router()

postRouter.post("/post", createPost)
postRouter.get("/posts", getPost)

module.exports = postRouter;