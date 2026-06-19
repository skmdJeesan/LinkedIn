import Post from "../models/post.model.js";
import uploadOnCloudinary from '../config/cloudinary.js'
import { io } from "../app.js";
import Notification from "../models/notification.model.js";

export const createPost = async (req, res) => {
  try {
    let { description } = req.body
    let newPost = await Post.create({ author: req.userId, description })

    if (req.file) {
      let image = await uploadOnCloudinary(req.file.path)
      newPost.image = image
      await newPost.save()
    }

    await newPost.populate({ path: 'author', select: '-password' })
    return res.status(201).json(newPost)
  } catch (error) {
    return res.status(500).json({ message: 'server error!' })
  }
}

export const deletePost = async (req, res) => {
  try {
    let { postId } = req.params
    await Post.findByIdAndDelete(postId)
    return res.status(200).json({ message: 'Post deleted successfully!' })
  } catch (error) {
    return res.status(500).json({ message: 'delete post error!' })
  }
}

export const getAllPost = async (req, res) => {
  try {
    let posts = await Post.find()
      .populate({ path: 'author', select: '-password' })
      .populate({
        path: 'comment.user',
        select: 'firstName lastName username profileImage headline'
      }).sort({ createdAt: -1 })
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ message: 'server error!' })
  }
}

export const like = async (req, res) => {
  try {
    let postId = req.params.id
    let userId = req.userId

    let post = await Post.findById(postId)
    if (!post) return res.status(400).json({ message: 'post not found!' })

    if (post.like.includes(userId)) {
      post.like = post.like.filter((id) => id != userId)
    } else {
      post.like.push(userId)
      if(post.author != userId) {
        await Notification.create({
        receiver: post.author,
        relatedUser: userId,
        relatedPost: postId,
        type: 'like'
      })
      }
    }

    await post.save()

    io.emit('likeUpdated', { postId, likes: post.like })
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: 'like error!' })
  }
}

export const comment = async (req, res) => {
  try {
    let postId = req.params.id
    let userId = req.userId
    let { content } = req.body

    let post = await Post.findByIdAndUpdate(postId, {
      $push: { comment: { content, user: userId } }
    }, { new: true }).populate({
      path: 'comment.user',
      select: 'firstName lastName profileImage headline'
    }).sort({ updatedAt: -1 })
    if(post.author != userId) {
      await Notification.create({
      receiver: post.author,
      relatedUser: userId,
      relatedPost: postId,
      type: 'comment'
    })
    }
    await post.save()
    io.emit('commentUpdated', { postId, comments: post.comment })
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: 'comment error!' })
  }
}

