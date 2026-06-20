import { Plus } from 'lucide-react'
import React from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { socket, userDataContext } from '../context/UserContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ConnectionBtn = ({postAuthorId}) => {
  const navigate = useNavigate()
  const {serverUrl} = useContext(authDataContext)
  const {userData} = useContext(userDataContext)
  const [status, setStatus] = useState('')

  const handleSendConnection = async () => {
    try {
      let res = await axios.post(`${serverUrl}/api/connection/send/${postAuthorId}`, {}, {withCredentials: true})
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveConnection = async () => {
    try {
      let res = await axios.delete(`${serverUrl}/api/connection/remove/${postAuthorId}`, { withCredentials: true })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetStatus = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/connection/get-status/${postAuthorId}`, {withCredentials: true})
      setStatus(res.data.status)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async () => {
    if(status == 'disconnect') await handleRemoveConnection()
    else if(status == 'received') navigate('/network')
    else await handleSendConnection()
  }

  useEffect(() => {
    if (userData?._id) socket.emit('register', userData._id)
    const handler = ({updatedUserId, newStatus}) => {
      if(updatedUserId == postAuthorId) setStatus(newStatus)
    }
    socket.on('statusUpdate', handler)
    handleGetStatus()
    return () => {
      socket.off('statusUpdate', handler)
    }
  }, [postAuthorId, userData?._id])

  return (
    <button onClick={handleClick} disabled={status == 'pending'}
      className="flex gap-1 items-center px-2 py-1 text-lg rounded bg-white hover:bg-blue-500/10 cursor-pointer capitalize">
      <Plus size={20} className='text-blue-500 font-semibold ' /> {status}
    </button>
  )
}

export default ConnectionBtn