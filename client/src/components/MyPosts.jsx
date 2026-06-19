import React, { useContext, useEffect, useState } from 'react'
import { TopBar2 } from './TopBar2'
import { userDataContext } from '../context/UserContext'
import dp from '../assets/dp.jpg'
import { Gem, MapPin, Pen, University } from 'lucide-react'
import EditProfile from './EditProfile'
import { useNavigate } from 'react-router-dom'
import PostCard from './PostCard'

const MyPosts = () => {
  const { userData, edit, setEdit, posts, setPosts } = useContext(userDataContext)
  const frontendProfileImg = userData?.profileImage || dp
  const frontendCoverImg = userData?.coverImage || ''
  const fullName = userData?.firstName ? `${userData.firstName} ${userData.lastName}` : userData?.username || 'Your Name'
  const headline = userData?.headline || 'Add a headline to tell people what you do.'
  const navigate = useNavigate()
  const [myPosts, setMyPosts] = useState([])

  const fetchMyPosts = () => {
    setMyPosts(posts.filter((p) => p.author._id === userData._id))
  }

  useEffect(() => {
    fetchMyPosts()
  }, [posts, userData])

  return (
    <div className='bg-[#F4F2EE] pt-14 lg:pt-20 min-h-screen w-full'>
      <TopBar2 />
      {edit && <EditProfile />}
      <div className='px-2 md:px-10 py-2'>
        <div className='max-w-5xl mx-auto flex flex-col gap-5'>

          <div className='bg-white shadow-sm rounded-xl overflow-hidden relative'>
            <div className='h-40 bg-gray-200 relative'>
              <img
                src={frontendCoverImg}
                alt='Cover'
                className='w-full h-full object-cover'
              />
              <div className='absolute left-6 -bottom-14'>
                <div className='h-28 w-28 rounded-full border-4 border-white overflow-hidden bg-gray-200'>
                  <img src={frontendProfileImg} alt='Profile' className='w-full h-full object-cover' />
                </div>
              </div>
            </div>
            <div className='pt-16 pb-6 px-6'>
              <h1 className='text-2xl font-semibold'>{fullName}</h1>
              <p className='text-gray-600'>{headline}</p>
              <div className='mt-2 flex flex-wrap gap-3 text-sm text-gray-600'>
                {userData?.location && (
                  <span className='flex items-center gap-2'>
                    <MapPin size={16} />
                    {userData.location}
                  </span>
                )}
                {userData?.username && <span className='lowercase'>@{userData.username}</span>}
              </div>
            </div>
            <div onClick={() => setEdit(true)} className="absolute top-4 right-4 cursor-pointer z-100"><Pen size={20} className='text-white hover:text-blue-500' /></div>
          </div>

          <div className='flex flex-col gap-5'>
            <div className="flex flex-col gap-4 min-h-screen">
              <h1 className="text-lg font-semibold bg-white rounded-lg shadow-md w-full py-4 px-4">Posts ({myPosts.length})</h1>
              {myPosts.map((post, i) => (
                <PostCard key={i} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPosts