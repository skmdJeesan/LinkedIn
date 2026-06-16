import Post from "../models/post.model.js";
import uploadOnCloudinary from '../config/cloudinary.js'

export const createPost = async (req, res) => {
  try {
    let {description} = req.body
    let newPost;
    if(req.file) {
      let image = await uploadOnCloudinary(req.file.path)
      newPost = await Post.create({author: req.userId, description, image})
    } else newPost = await Post.create({author: req.userId, description})

    return res.status(201).json(newPost)
  } catch (error) {
    return res.status(500).json({message: 'server error!'})
  }
}

export const getAllPost = async (req, res) => {
  try {
    let posts = await Post.find()
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({message: 'server error!'})
  }
}