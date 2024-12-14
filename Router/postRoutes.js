const {Router} = require("express")
const {createPost, getPost} = require("../controllers/postController")
const checkToken = require("../middleware")
const postRouter = Router()

postRouter.post("/post", createPost)
postRouter.get("/posts", checkToken ,getPost)

module.exports = postRouter;