
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
import dp from '../assets/dp.jpg'
import CreatePost from '../components/CreatePost'

const Feed = () => {
  const { userData, setUserData, edit, setEdit, startPost, setStartPost } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const frontendProfileImg = userData?.profileImage || dp
  const frontendCoverImg = userData?.coverImage || ''

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
    <div className='px-2 md:px-10 bg-[#F4F2EE] min-h-screen w-full flex flex-col md:flex-row items-start justify-center gap-5 pt-14 lg:pt-20'>

      <TopBar2 />
      {edit && <EditProfile />}

      <div className="w-full md:w-[25%] min-h-50 bg-white shadow-sm rounded-lg relative pb-2">
        {/* Cover Image */}
        <div className="w-full h-28 bg-gray-500 rounded-t-lg overflow-hidden">
          <img src={frontendCoverImg} alt="" className="w-full h-full bg-cover rounded" />
        </div>

        {/* Profile Image */}
        <div className="h-20 w-20 rounded-full absolute top-16 left-8">
          <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
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

      {startPost && <CreatePost />}
      <div className="w-full md:w-[50%] min-h-50 bg-[#F4F2EE] rounded-lg p-1">
        <div className="flex items-center justify-center gap-4 w-full bg-white px-2 py-4 rounded-lg shadow-sm">
          <div className="h-14 w-14 rounded-full">
            <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
          </div>
          <button onClick={() => setStartPost(true)} 
            className="w-3/4 border border-blue-500 text-blue-500 hover:bg-blue-500/10 py-3 px-8 rounded-full cursor-pointer flex items-center justify-start">
            Start a post
          </button>
        </div>
      </div>

      <div className="w-full md:w-[25%] min-h-50 bg-white shadow-sm rounded-lg p-2">news or connections</div>


    </div>
  )
}

export default Feed