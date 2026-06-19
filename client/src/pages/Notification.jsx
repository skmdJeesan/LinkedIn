import React, { useContext, useEffect, useState } from 'react'
import { TopBar2 } from '../components/TopBar2'
import { userDataContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import ConnectionBtn from '../components/ConnectionBtn'
import dp from '../assets/dp.jpg'
import moment from 'moment'
import { Check, X } from 'lucide-react'

const Notification = () => {
  const { userData, setUserData, edit, setEdit } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const frontendProfileImg = userData?.profileImage || dp
  const frontendCoverImg = userData?.coverImage || ''
  const [suggestedUser, setSuggestedUser] = useState([])
  const [notifications, setNotifications] = useState([])
  const [selectedTab, setSelectedTab] = useState('all')


  const handleGetNotifications = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/notification/get-all/`, { withCredentials: true })
      // console.log(res.data)
      setNotifications(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteNotification = async (notificationId) => {
    try {
      let res = await axios.delete(`${serverUrl}/api/notification/remove-one/${notificationId}`, {
        withCredentials: true,
      })
      //console.log(res.data)
      // setNotifications((prev) => prev.filter((noti) => noti._id !== notificationId))
      await handleGetNotifications()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteAllNotification = async () => {
    try {
      let res = await axios.delete(`${serverUrl}/api/notification/remove-all`, {
        withCredentials: true,
      })
      // console.log(res.data)
      // setNotifications([])
      await handleGetNotifications()
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
    handleGetNotifications()
  }, [notifications])

  useEffect(() => {
    handleGetSuggestedUser()
  })

  const handleMessage = (type) => {
    if (type == 'like') return 'Liked your post!'
    else if (type == 'comment') return 'Commented on your post!'
    else if (type == 'connectionAccept') return 'Accepted your connection request!'
    else return 'Rejected your connection request!'
  }

  return (
    <div className='bg-[#F4F2EE] pt-16 lg:pt-20 min-h-screen w-full flex flex-col items-center gap-4 px-2'>
      <TopBar2 />

      {/* profile card */}
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

      <div className="flex flex-col gap-2 w-full md:w-1/2 px-0 md:px-3">
        <h2 className="text-xl md:text-3xl font-semibold pl-2">Notifications({notifications.length})</h2>
        <div className="rounded-lg shadow-md w-full py-2 px-8 flex items-center justify-between h-16 bg-white">
          <div className="flex items-center gap-6">
            <button onClick={() => setSelectedTab('all')}
              className={`px-4 py-1 border border-gray-600 cursor-pointer hover:border-black rounded-full font-semibold ${selectedTab == 'all' ? 'bg-blue-500 text-white border-none' : ''}`}>All</button>
            <button onClick={() => setSelectedTab('mentions')}
              className={`px-4 py-1 border border-gray-600 cursor-pointer hover:border-black rounded-full font-semibold ${selectedTab == 'mentions' ? 'bg-blue-500 text-white border-none' : ''}`}>Mentions</button>
          </div>
          {notifications.length > 0 && <button onClick={handleDeleteAllNotification}
            className="cursor-pointer hover:text-blue-600 hover:underline">
            Clear All
          </button>}
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          {notifications.map((noti, i) => (
            <div key={i} className="flex items-start justify-between bg-white shadow-md rounded-lg w-full px-3 md:px-4 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-full">
                    <img src={noti?.relatedUser?.profileImage || dp} alt="" className="w-full h-full bg-cover rounded-full" />
                  </div>
                  <div className="">
                    <h1 className="text-sm font-semibold leading-[1.1]">
                      {noti?.relatedUser?.firstName + ' ' + noti?.relatedUser?.lastName} <span className='text-blue-600'>{handleMessage(noti.type)}</span>
                    </h1>
                    <p className="text-xs">({moment(noti.createdAt).fromNow()})</p>
                  </div>
                </div>
                {noti.relatedPost && <div className='flex items-start gap-2 ml-14 md:ml-16 min-h-10'>
                  <div className="w-20 h-10 overflow-hidden cursor-pointer">
                    <img src={noti.relatedPost.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="leading-[1.1]">{noti.relatedPost.description}</div>
                </div>}
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleDeleteNotification(noti._id)}
                  className="border w-6 md:w-8 h-6 md:h-8 p-1 flex items-center justify-center border-gray-300 hover:bg-red-500/20 cursor-pointer rounded-full">
                  <X className='text-sm text-red-500' />
                </button>
              </div>
            </div>
          ))}
          {notifications.length == 0 && <div className='w-full py-4 rounded-lg shadow-md px-8 bg-white'>
            <p className="text-base text-center text-gray-600">No Notifications yet!</p>
          </div>}
        </div>
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

export default Notification