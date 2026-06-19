import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if(!user) return res.status(404).json({message: '404 user not found!'})
    return res.status(200).json(user)
  } catch (error) {
   return res.status(500).json({message: 'server error!'})
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, headline, location, gender } = req.body
    let skills = req.body.skills ? JSON.parse(req.body.skills) : []
    let education = req.body.education ? JSON.parse(req.body.education) : []
    let experience = req.body.experience ? JSON.parse(req.body.experience) : []

    let profileImg;
    let coverImg;
    console.log(req.files)
    if (req.files.profileImg) {
      profileImg = await uploadOnCloudinary(req.files.profileImg[0].path)
    }
    if (req.files.coverImg) {
      coverImg = await uploadOnCloudinary(req.files.coverImg[0].path)
    }

    const user = await User.findByIdAndUpdate(req.userId, {
      firstName,
      lastName,
      headline,
      location,
      gender,
      skills,
      experience,
      education,
      profileImage: profileImg,
      coverImage: coverImg
    }, { new: true }).select('-password')

    if (!user) {
      return res.status(404).json({ message: '404 user not found!' })
    }

    return res.status(200).json({ message: 'Profile updated successfully!', user })
  } catch (error) {
   return res.status(500).json({message: 'server error!'})
  }
}

export const getProfile = async (req, res) => {
  try {
    let {username} = req.params
    let user = await User.findOne({username}).select('-password')
    if(!user) return res.status(400).json({message: 'user does not exist!'})
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message: 'get profile error'})
  }
}

export const search = async (req, res) => {
  try {
    let {q} = req.query
    if(!q) return res.status(400).json({message: 'query is required!'})
    let users = await User.find({
      $or: [
        {firstName: {$regex: q, $options: 'i'}},
        {lastNameName: {$regex: q, $options: 'i'}},
        {username: {$regex: q, $options: 'i'}},
        {skills: {$in: [q]}}
      ]
    })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({message: 'search error!'})
  }
}

export const getSuggestedUser = async (req, res) => {
  try {
    let currUser = await User.findById(req.userId).select('connection')
    let suggestedUser = await User.find({
      _id: {$ne: currUser._id, $nin: currUser.connection || []}
    }).select('-password')
    return res.status(200).json(suggestedUser)
  } catch (error) {
    return res.status(500).json({message: 'user suggestion error!'})
  }
}