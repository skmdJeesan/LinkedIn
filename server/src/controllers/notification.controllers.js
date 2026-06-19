import Notification from "../models/notification.model.js"

export const getAllNoti = async (req, res) => {
  try {
    let userId = req.userId
    let notifications = await Notification.find({receiver: userId})
    .populate('relatedUser', 'firstName lastName profileImage')
    .populate('relatedPost', 'description image')

    return res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({message: 'get all notification error!'})
  }
}

export const removeAllNoti = async (req, res) => {
  try {
    await Notification.deleteMany({receiver: req.userId})
    res.status(200).json({message: 'All notifications deleted successfully!'})
  } catch (error) {
    res.status(500).json({message: 'remove all notification error!'})
  }
}

export const removeOneNoti = async (req, res) => {
  try {
    let {notificationId} = req.params
    await Notification.findByIdAndDelete(notificationId)
    res.status(200).json({message: 'notification deleted successfully!'})
  } catch (error) {
    res.status(500).json({message: 'remove ome notification error!'})
  }
}