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

  return (
    <button onClick={handleRemovePost} disabled={status == 'pending'}
      className="flex gap-1 items-center px-2 py-1 text-base md:text-lg rounded bg-white hover:bg-red-500/10 cursor-pointer capitalize text-red-500">
      <Minus size={16} className='text-red-500 font-semibold ' /> Delete Post
    </button>
  )
}

export default PostDeleteBtn