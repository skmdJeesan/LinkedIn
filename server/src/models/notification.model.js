import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  relatedUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  relatedPost: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  type: {type: String, enum: ['like', 'comment', 'coonectionAccept', 'coonectionReceived']}
}, {timestamps: true})

const Notification = mongoose.model('Notification', notificationSchema)
export default Notification