import { io, userSocketMap } from "../app.js";
import Connection from "../models/connection.model.js"
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js"

export const sendConnectionReq = async (req, res) => {
  try {
    const senderId = req.userId
    const { receiverId } = req.params;

    if (senderId === receiverId) {
      return res.status(400).json({ message: 'you can not request connection to yourself!' })
    }

    const sender = await User.findById(senderId)
    if (sender.connection.includes(receiverId)) {
      return res.status(400).json({ message: 'you already connected!' })
    }

    const existConnection = await Connection.findOne({
      sender: senderId, receiver: receiverId, status: 'pending'
    })

    if (existConnection) {
      return res.status(400).json({ message: 'you already requested connection!' })
    }

    const newConnectionRequest = await Connection.create({ sender: senderId, receiver: receiverId })
    await Notification.create({
      receiver: newConnectionRequest.receiver,
      relatedUser: newConnectionRequest.sender,
      type: 'connectionReceived'
    })
    const receiverSocketId = userSocketMap.get(receiverId)
    const senderSocketId = userSocketMap.get(senderId)
    if (receiverSocketId) io.to(receiverSocketId).emit('statusUpdate', { updatedUserId: senderId, newStatus: 'received' })
    if (senderSocketId) io.to(senderSocketId).emit('statusUpdate', { updatedUserId: receiverId, newStatus: 'pending' })

    return res.status(200).json(newConnectionRequest)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'request connection error!' })
  }
}

export const acceptConnectionReq = async (req, res) => {
  try {
    const { connectionId } = req.params;
    const userId = req.userId

    const connection = await Connection.findById(connectionId)
    if (!connection) {
      return res.status(404).json({ message: 'connection request not found!' })
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({ message: 'connection request already processed!' })
    }

    if (connection.receiver.toString() !== userId) {
      return res.status(400).json({ message: 'you are not the receiver!' })
    }

    connection.status = 'accepted'
    await connection.save()

    await User.findByIdAndUpdate(connection.sender, {
      $push: { connection: connection.receiver }
    })
    await User.findByIdAndUpdate(connection.receiver, {
      $push: { connection: connection.sender }
    })

    await Notification.create({
      receiver: connection.sender,
      relatedUser: userId,
      type: 'connectionAccepted'
    })

    const receiverIdStr = connection.receiver.toString()
    const senderIdStr = connection.sender.toString()
    const receiverSocketId = userSocketMap.get(receiverIdStr)
    const senderSocketId = userSocketMap.get(senderIdStr)
    if (receiverSocketId) io.to(receiverSocketId).emit('statusUpdate', { updatedUserId: senderIdStr, newStatus: 'disconnect' })
    if (senderSocketId) io.to(senderSocketId).emit('statusUpdate', { updatedUserId: receiverIdStr, newStatus: 'disconnect' })

    return res.status(200).json({ message: 'connection accepted!', connection })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'accept connection error!' })
  }
}

export const rejectConnectionReq = async (req, res) => {
  try {
    const { connectionId } = req.params;
    const userId = req.userId

    const connection = await Connection.findById(connectionId)
    if (!connection) {
      return res.status(404).json({ message: 'connection request not found!' })
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({ message: 'connection request already processed!' })
    }

    if (connection.receiver.toString() !== userId) {
      return res.status(400).json({ message: 'you are not the receiver!' })
    }

    connection.status = 'rejected'
    await connection.save()

    const receiverIdStr = connection.receiver.toString()
    const senderIdStr = connection.sender.toString()
    const receiverSocketId = userSocketMap.get(receiverIdStr)
    const senderSocketId = userSocketMap.get(senderIdStr)
    if (receiverSocketId) io.to(receiverSocketId).emit('statusUpdate', { updatedUserId: senderIdStr, newStatus: 'connect' })
    if (senderSocketId) io.to(senderSocketId).emit('statusUpdate', { updatedUserId: receiverIdStr, newStatus: 'connect' })

    return res.status(200).json({ message: 'connection rejected!', connection })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'reject connection error!' })
  }
}

export const getConnectionStatus = async (req, res) => {
  try {
    const targetUserId = req.params.userId
    const currentUserId = req.userId

    let currentUser = await User.findById(currentUserId)
    if (currentUser.connection.includes(targetUserId)) {
      return res.json({ status: 'disconnect' })
    }

    const pendingRequest = await Connection.findOne({
      $or: [{ sender: currentUserId, receiver: targetUserId }, { sender: targetUserId, receiver: currentUserId }],
      status: 'pending'
    })

    if (pendingRequest) {
      if (pendingRequest.sender.toString() === currentUserId) {
        return res.json({ status: 'pending' })
      } else {
        return res.json({ status: 'received', requestId: pendingRequest._id })
      }
    }

    return res.json({ status: 'connect' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'get status server error!' })
  }
}

export const removeConnection = async (req, res) => {
  try {
    const myId = req.userId
    const othersId = req.params.userId

    await User.findByIdAndUpdate(myId, {
      $pull: { connection: othersId }
    })

    await User.findByIdAndUpdate(othersId, {
      $pull: { connection: myId }
    })

    let receiverSoketId = userSocketMap.get(othersId)
    let senderSockeId = userSocketMap.get(myId)
    if (receiverSoketId) io.to(receiverSoketId).emit('statusUpdate', { updatedUserId: myId, newStatus: 'connect' })
    if (senderSoketId) io.to(senderSoketId).emit('statusUpdate', { updatedUserId: othersId, newStatus: 'connect' })

    return res.json({ message: 'connection removed successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'remove connection error!' })
  }
}

export const getAllConnectionReq = async (req, res) => {
  try {
    const userId = req.userId

    const requests = await Connection.find({ receiver: userId, status: 'pending' })
      .populate('sender', 'firstName lastName profileImage headline email username')

    return res.status(200).json(requests)
  } catch (error) {
    return res.status(500).json({ message: 'get all connection error!' })
  }
}

export const getAllUserConnection = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId).populate('connection', 'firstName lastName profileImage headline email username')
    return res.status(200).json(user.connection)
  } catch (error) {
    return res.status(500).json({ message: 'get all connection error' })
  }
}