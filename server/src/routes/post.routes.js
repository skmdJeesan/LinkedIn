import express from 'express'
import { comment, createPost, deletePost, getAllPost, like } from '../controllers/post.controllers.js'
import isAuth from '../middlewares/isAuth.js'
import upload from '../middlewares/multer.js'

const postRouter = express.Router()

postRouter.post('/create', isAuth, upload.single('image'), createPost)
postRouter.delete('/remove/:postId', isAuth, deletePost)
postRouter.get('/get-all', isAuth, getAllPost)
postRouter.get('/like/:id', isAuth, like)
postRouter.post('/comment/:id', isAuth, comment)

export default postRouter