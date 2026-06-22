import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  profileImage: {type: String, default: ''},
  coverImage: {type: String, default: ''},
  headline: {type: String, default: ''},
  skills: [{type: String}],
  education: [{college: {type: String}, degree: {type: String}, fieldOfStudy: {type: String}}],
  location: {type: String, default: 'India'},
  gender: {type: String, enum: ['Male', 'Female', 'Other']},
  experience: [{title: {type: String}, company: {type: String}, description: {type: String}}],
  connection: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  verifyToken: { type: String, required: false, },
  verifyTokenExpires: { type: Date },
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date}
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;