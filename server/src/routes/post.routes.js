import express from 'express'
import { createPost, getAllPost } from '../controllers/post.controllers.js'
import isAuth from '../middlewares/isAuth.js'
import upload from '../middlewares/multer.js'

const postRouter = express.Router()

postRouter.post('/create', isAuth, upload.single('image'), createPost)
postRouter.get('/get-all', isAuth, getAllPost)

export default postRouter