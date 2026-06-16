
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { Loader2, Settings } from 'lucide-react'
import { TopBar2 } from '../components/TopBar2'
// import { News } from '../components/News'
// import { CreatePostCard } from '../components/CreatePost'
// import { Analytics } from '../components/Analytics'
// import { ProfileCard } from '../components/ProfileCard'
// import { PostCard } from '../components/PostCard'
import EditProfile from '../components/EditProfile'

const Feed = () => {
  const { userData, setUserData, edit, setEdit } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  let [frontendProfileImg, setFrontendProfileImg] = useState(userData ? userData.profileImage : dp)
  let [frontendCoverImg, setFrontendCoverImg] = useState(userData ? userData.coverImage : '')

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
    // <div className='bg-amber-50'>
    //   <TopBar2/>
    //   <div className='grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto px-4 md:px-8 mt-6'>
    //     <div className='md:col-span-3'>
    //       <ProfileCard name={"Anshak"} title={"Full Stack Developer"} address={"Cooch Behar"} banner={"https://media.licdn.com/dms/image/v2/D5616AQHfnbmv7e3Q8A/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1733593298188?e=1782950400&v=beta&t=A3zBWAfA7yMPbGoEwd7Ubme0E-SdHdjzdotf8e4Ehn8"} profilePic={"https://media.licdn.com/dms/image/v2/D5603AQGellffH2dxtA/profile-displayphoto-shrink_800_800/B56ZOiMHBbGoAg-/0/1733592905315?e=1782950400&v=beta&t=bSBm1M90-76a74KfC0SwkxlHUIqoOaHEnk9Uxfgnq7Y"}/>
    //       {/* <Analytics/>
    //       <Settings/> */}
    //     </div>
    //     <div className="md:col-span-6">
    //       <PostCard/>
    //       <CreatePostCard/>
    //     </div>
    //     <div className='hidden md:block md:col-span-3'>
    //       <News/>
    //     </div>
    //   </div>
    // </div>

    <div className='px-2 md:px-10 bg-[#F4F2EE] min-h-screen w-full flex flex-col lg:flex-row items-start justify-center gap-5 pt-14 lg:pt-20'>

      <TopBar2 />
      {edit && <EditProfile />}

      {/* <h1 className='text-2xl font-bold mb-1 mt-14'>Welcome to the Feed, <span className='font-bold text-[#0077B6]'>{userData ? userData.lastName : 'Guest'}!</span></h1>
      <p className='text-gray-600 mb-2'>Here's what's happening with your network.</p>
      <div className="flex items-center gap-3">
        <button onClick={handleLogout}
          className='bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 cursor-pointer'>
          {loading ? <Loader2 className='animate-spin' size={20} /> : 'Logout'}
        </button>
        <button onClick={() => setEdit(true)}
          className='bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 cursor-pointer'>
          {loading ? <Loader2 className='animate-spin' size={20} /> : 'Edit Profile'}
        </button>
      </div> */}


      <div className="w-full md:w-[25%] min-h-50 bg-white shadow-lg rounded-lg relative pb-2">
        {/* Cover Image */}
        <div className="w-full h-28 bg-gray-500 rounded-t-lg overflow-hidden">
          <img src={frontendCoverImg} alt="" className="w-full h-full bg-cover rounded" />
        </div>

        {/* Profile Image */}
        <div className="h-20 w-20 rounded-full absolute top-16 left-8">
          <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
        </div>

        <h1 className="mt-10 ml-4 font-semibold">{userData.firstName + ' ' + userData.lastName}</h1>
        <p className="ml-4 text-base text-gray-600">{userData.headline}</p>
        <p className="ml-4 text-base text-gray-600">{userData.education[0].college + ', ' + userData.location}</p>

        <button onClick={() => setEdit(true)}
          className='mt-4 ml-8 w-3/4 border border-blue-500 text-blue-500 hover:bg-blue-500/10 py-1.5 px-4 rounded-full cursor-pointer flex items-center justify-center'>
          {loading ? <Loader2 className='animate-spin' size={20} /> : 'Edit Profile'}
        </button>

      </div>

      <div className="w-full md:w-[50%] min-h-50 bg-white shadow-lg rounded-lg p-2">posts</div>
      <div className="w-full md:w-[25%] min-h-50 bg-white shadow-lg rounded-lg p-2">news or connections</div>


    </div>
  )
}

export default Feed