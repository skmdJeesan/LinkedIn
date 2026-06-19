import { Minus } from 'lucide-react'
import React from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//const socket = io("https://linkedin-server-zgza.onrender.com");

const PostDeleteBtn = ({postId}) => {
  const navigate = useNavigate()
  const {serverUrl} = useContext(authDataContext)
  const {userData, fetchAllPosts} = useContext(userDataContext)

  const handleRemovePost = async () => {
    try {
      await axios.delete(`${serverUrl}/api/post/remove/${postId}`, { withCredentials: true })
      fetchAllPosts()
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   if (userData?._id) socket.emit('register', userData._id)
  //   const handler = ({updatedUserId, newStatus}) => {
  //     if(updatedUserId == postAuthorId) setStatus(newStatus)
  //   }
  //   socket.on('statusUpdate', handler)
  //   handleGetStatus()
  //   return () => {
  //     socket.off('statusUpdate', handler)
  //   }
  // }, [postAuthorId, userData?._id])

  return (
    <button onClick={handleRemovePost} disabled={status == 'pending'}
      className="flex gap-1 items-center px-2 py-1 text-base md:text-lg rounded bg-white hover:bg-red-500/10 cursor-pointer capitalize text-red-500">
      <Minus size={16} className='text-red-500 font-semibold ' /> Delete Post
    </button>
  )
}

export default PostDeleteBtn