import React from 'react'
import { TopBar2 } from './TopBar2'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import { useEffect } from 'react'
import axios from 'axios'
import dp from '../assets/dp.jpg'
import moment from 'moment'
import { Check, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ConnectionBtn from './ConnectionBtn'

const Network = () => {
  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)
  const [connections, setConnections] = useState([]) // basically connection requests
  const [userConnections, setUserConnections] = useState([])
  const [suggestedUser, setSuggestedUser] = useState([])
  const frontendProfileImg = userData?.profileImage || dp
  const frontendCoverImg = userData?.coverImage || ''
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleGetAllConnection = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/connection/`, { withCredentials: true })
      // console.log(res.data)
      setUserConnections(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetConnectionReq = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/connection/requests/`, { withCredentials: true })
      // console.log(res.data)
      setConnections(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAcceptReq = async (connectionId) => {
    try {
      let res = await axios.put(`${serverUrl}/api/connection/accept/${connectionId}`, {}, { withCredentials: true })
      //console.log(res.data)
      setConnections((prev) => prev.filter((conn) => conn._id !== connectionId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRejectReq = async (connectionId) => {
    try {
      let res = await axios.put(`${serverUrl}/api/connection/reject/${connectionId}`, {}, { withCredentials: true })
      // console.log(res.data)
      setConnections((prev) => prev.filter((conn) => conn._id !== connectionId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetSuggestedUser = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/user/suggested-user`, { withCredentials: true })
      // console.log(res.data)
      setSuggestedUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    handleGetConnectionReq()
    handleGetAllConnection()
    handleGetSuggestedUser()
  }, [])
  return (
    <div className='bg-[#F4F2EE] pt-16 lg:pt-20 min-h-screen w-full flex flex-col items-center gap-4 px-2 md:px-10'>
      <TopBar2 />
      {/* Profile Card */}
      <div className="w-full md:w-[20%] relative hidden md:block md:fixed left-0 md:left-17">
        <div className="w-full min-h-50 bg-white shadow-sm rounded-lg  pb-2">
          {/* Cover Image */}
          <div className="w-full h-28 bg-gray-500 rounded-t-lg overflow-hidden">
            <img src={frontendCoverImg} alt="" className="w-full h-full object-cover object-center rounded" />
          </div>

          {/* Profile Image */}
          <div className="h-20 w-20 rounded-full absolute top-16 left-8">
            <img src={frontendProfileImg} alt="" className="w-full h-full object-cover rounded-full" />
          </div>

          <h1 className="mt-10 ml-4 font-semibold">{userData?.firstName ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}</h1>
          <p className="ml-4 text-base text-gray-600">{userData?.headline ?? 'No headline yet'}</p>
          <p className="ml-4 text-base text-gray-600">
            {userData?.education?.[0]?.college ? `${userData.education[0].college}, ${userData.location ?? ''}` : 'Education not provided'}
          </p>

          <button onClick={() => setEdit(true)}
            className='mt-4 ml-8 w-3/4 border border-blue-500 text-blue-500 hover:bg-blue-500/10 py-1.5 px-4 rounded-full cursor-pointer flex items-center justify-center'>
            {loading ? <Loader2 className='animate-spin' size={20} /> : 'Edit Profile'}
          </button>
        </div>
        <div className="hidden bg-white mt-2 shadow-sm rounded-lg md:flex flex-col px-6 py-2 items-start">
          <p className="text-gray-500 text-sm">Access exclusive tools & insights</p>
          <p className="font-semibold text-sm cursor-pointer hover:text-blue-500">Try Premium for ₹0</p>
        </div>
      </div>

      <div className="rounded-lg shadow-md bg-white w-full md:w-1/2 py-2 px-8 flex flex-col gap-2">
        <p className="">Invitations &nbsp;&nbsp; {connections.length}</p>
        <p className="">See Connections &nbsp;&nbsp; {userConnections.length}</p>
      </div>
      <div className="flex flex-col items-start justify-center w-full md:w-1/2 gap-3">
        {connections.map((c, i) => (
          <div key={i} className="flex center justify-between bg-white shadow-md rounded-lg w-full px-4 py-4">
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full">
                <img src={c?.sender?.profileImage || dp} alt="" className="w-full h-full bg-cover rounded-full" />
              </div>
              <div className="">
                <h1 className="text-base font-semibold -mt-1">{c?.sender?.firstName + ' ' + c?.sender?.lastName}</h1>
                <h3 className="text-gray-600 text-sm -mt-1">{c?.sender?.headline}</h3>
                <p className="text-xs -mt-1">{moment(c.createdAt).fromNow()}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                  onClick={() => handleAcceptReq(c._id)} 
                  className="border w-8 h-8 p-1 flex items-center justify-center border-gray-300 hover:bg-blue-500/20 cursor-pointer rounded-full">
                  <Check className='text-sm text-blue-500'/>
                </button>
              <button
                  onClick={() => handleRejectReq(c._id)} 
                  className="border w-8 h-8 p-1 flex items-center justify-center border-gray-300 hover:bg-red-500/20 cursor-pointer rounded-full">
                  <X className='text-sm text-red-500'/>
                </button>
            </div>
          </div>
        ))}
        {connections.length == 0 && <div className='w-full py-4 rounded-lg shadow-md px-8 bg-white'>
          <p className="text-base text-gray-600">No pending invitations</p>
        </div>}
      </div>

      <div className="w-full md:w-[22%] min-h-50 bg-white shadow-sm rounded-lg py-2 hidden md:flex flex-col gap-4 md:fixed right-0 md:right-12">
        <h1 className="text-gray-600 font-bold text-lg ml-4">Suggestions</h1>
        {suggestedUser.length > 0 && suggestedUser.map((user, i) => (
          <div key={i} className="flex items-start justify-between px-4">
            <Link to={`/profile/${user.username}`} className="flex gap-3 items-start cursor-pointer">
              <div className="h-12 w-12 rounded-full">
                <img src={user.profileImage || dp} alt="" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="">
                <h1 className="text-base font-semibold">{user.firstName + ' ' + user.lastName}</h1>
                <h3 className="text-gray-600 text-xs -mt-1">{user.headline}</h3>
              </div>
            </Link>
            <div className="px-2">
              {userData._id != user._id && <ConnectionBtn postAuthorId={user._id} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Network