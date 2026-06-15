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