import React, { useContext, useState } from "react";

import { TopELementWIthDrop } from "../components/TopElementWIthDrop";
import { TopELement2 } from "./TopElement2";
import { SearchBox } from "./SearchBox";
import linkedInLogo from '../assets/linkedLogo.webp'

import { Bell, BriefcaseBusiness, CircleUserRound, Grid3x3, Home, MessageCircle, Workflow } from "lucide-react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function TopBar2() {
  let { userData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  let [frontendProfileImg, setFrontendProfileImg] = useState(userData ? userData.profileImage : dp)
  let [loading, setLoading] = useState(false)
  let [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

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

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 z-400 w-full">
      <div className="w-full mx-auto px-4 md:px-8 h-14 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-1 md:gap-2">
          <img
            src={linkedInLogo} alt="LinkedIn"
            className="h-14 w-auto"
          />
          <SearchBox />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 md:gap-4">
          <TopELement2
            title="Home"
            icon={<Home size={22} />}
            flag='false'
          />

          <TopELement2
            title="My Network"
            icon={<Workflow size={22} />}
            flag='false'
          />

          <TopELement2
            title="Jobs"
            icon={<BriefcaseBusiness size={22} />}
            flag='false'
          />

          <TopELement2
            title="Messaging"
            icon={<MessageCircle size={22} />}
            flag='false'
          />

          <TopELement2
            title="Notifications"
            icon={<Bell size={22} />}
            flag='true'
          />

          <div className="relative" onClick={() => setShowProfile(prev => !prev)}>
            <div className="h-10 w-10 cursor-pointer hover:scale-105">
              <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
            </div>
            {showProfile && <div className="min-h-60 w-60 md:w-70 bg-white rounded-2xl shadow-2xl absolute top-16 right-0 lg:-right-20 flex flex-col px-2 py-4 sm:p-4 items-center gap-2">
              <div className="h-20 w-20 rounded-full">
                <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
              </div>
              <h1 className="">{userData.firstName + ' ' + userData.lastName}</h1>
              <button className='border border-blue-500 text-blue-500 hover:bg-blue-500/10 py-1.5 w-3/4 px-4 rounded-full cursor-pointer flex items-center justify-center'>
                View Profile
              </button>
              <div className="h-px bg-gray-300 w-full"></div>
              <div className="flex gap-3 text-sm sm:text-base w-3/4 rounded-full hover:bg-blue-500/10 py-2 px-4 cursor-pointer"><Workflow size={22} /> My Networks</div>
              <div className="flex gap-3 text-sm sm:text-base w-3/4 rounded-full hover:bg-blue-500/10 py-2 px-4 cursor-pointer"><BriefcaseBusiness size={22} /> Jobs</div>
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