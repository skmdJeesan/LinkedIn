import React, { useContext, useEffect, useState } from "react";

import { TopELementWIthDrop } from "../components/TopElementWIthDrop";
import { TopELement2 } from "./TopElement2";
import { SearchBox } from "./SearchBox";
import linkedInLogo from '../assets/linkedLogo.webp'
import dp from '../assets/dp.jpg'

import { Bell, BriefcaseBusiness, CircleUserRound, Grid3x3, Home, Loader2, MessageCircle, Workflow } from "lucide-react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export function TopBar2() {
  let { userData, setUserData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  const frontendProfileImg = userData?.profileImage || dp
  let [loading, setLoading] = useState(false)
  let [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [notifications, setNotifications] = useState([])

  const pathname = location.pathname
  let selectedTab = ''
  if (pathname === '/' || pathname.startsWith('/feed')) selectedTab = 'home'
  else if (pathname.startsWith('/network')) selectedTab = 'network'
  else if (pathname.startsWith('/messaging')) selectedTab = 'messaging'
  else if (pathname.startsWith('/notification')) selectedTab = 'notifications'
  else if (pathname.startsWith('/jobs')) selectedTab = 'jobs'

  const handleGetNotifications = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/notification/get-all/`, { withCredentials: true })
      // console.log(res.data)
      setNotifications(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetNotifications()
  }, [notifications])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await axios.post(serverUrl + '/api/auth/logout', {}, { withCredentials: true })
      // clear local user state and redirect to login
      setUserData(null)
      setLoading(false)
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
      setLoading(false)
    }
  }

  let notiCnt = notifications.length

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 z-400 w-full">
      <div className="w-full mx-auto px-3 md:px-12 h-14 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-0 md:gap-2">
          <img
            onClick={() => navigate('/feed')}
            src={linkedInLogo} alt="LinkedIn"
            className="h-14 w-auto cursor-pointer"
          />
          <SearchBox />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 md:gap-4">
          <TopELement2
            name="home"
            title="Home"
            icon={<Home size={22} />}
            flag='false'
            selectedTab={selectedTab}
            onClick={() => navigate('/feed')}
          />

          <TopELement2
            name="network"
            title="My Network"
            icon={<Workflow size={22} />}
            flag='false'
            selectedTab={selectedTab}
            onClick={() => navigate('/network')}
          />

          <TopELement2
            name="jobs"
            title="Jobs"
            icon={<BriefcaseBusiness size={22} />}
            flag='false'
            selectedTab={selectedTab}
            onClick={() => navigate('/jobs')}
          />

          <TopELement2 
            name="messaging"
            title="Messaging"
            icon={<MessageCircle size={22} />}
            flag='false'
            selectedTab={selectedTab}
            onClick={() => navigate('/messaging')}
          />

          <TopELement2
            name="notifications"
            title="Notifications"
            icon={<Bell size={22} />}
            flag='true'
            selectedTab={selectedTab}
            onClick={() => navigate('/notification')}
            notiCnt={notiCnt}
          />

          <div className="relative" onClick={() => setShowProfile(prev => !prev)}>
            <div className="h-10 w-10 cursor-pointer hover:scale-105">
              <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
            </div>
            {showProfile && <div className="min-h-60 w-60 md:w-70 bg-white rounded-2xl shadow-2xl absolute top-16 right-0 lg:-right-20 flex flex-col px-2 py-4 sm:p-4 items-center gap-2">
              <div className="h-20 w-20 rounded-full">
                <img src={frontendProfileImg} alt="" className="w-full h-full object-cover object-center rounded-full" />
              </div>
              <h1 className="">{userData.firstName + ' ' + userData.lastName}</h1>
              <button onClick={() => navigate('/profile/me')}
                className='border border-blue-500 text-blue-500 hover:bg-blue-500/10 py-1.5 w-3/4 px-4 rounded-full cursor-pointer flex items-center justify-center'>
                View Profile
              </button>
              <div className="h-px bg-gray-300 w-full"></div>
              <div className="flex gap-3 text-sm sm:text-base w-3/4 rounded-full hover:bg-blue-500/10 py-2 px-4 cursor-pointer" onClick={() => navigate('/network')}><Workflow size={22} /> My Networks</div>
              <div className="flex gap-3 text-sm sm:text-base w-3/4 rounded-full hover:bg-blue-500/10 py-2 px-4 cursor-pointer" onClick={() => navigate('/messaging')}><MessageCircle size={22} /> Messaging</div>
              <button onClick={handleLogout}
                className='border border-red-500 text-red-500 hover:bg-red-500/10 py-1.5 w-3/4 px-4 rounded-full cursor-pointer flex items-center justify-center'>
                {loading ? <Loader2 className='animate-spin' size={20} /> : 'Log Out'}
              </button>
            </div>}
          </div>

          <div className="hidden lg:block h-8 border-l border-gray-300"></div>

          <div className="hidden lg:block">
            <TopELementWIthDrop
              title="For Business"
              icon={<Grid3x3 size={22} />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}