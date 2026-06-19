
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { Calendar, Group, GroupIcon, Loader2, LucideSave, Newspaper, Save, Settings } from 'lucide-react'
import { TopBar2 } from '../components/TopBar2'
// import { News } from '../components/News'
// import { CreatePostCard } from '../components/CreatePost'
// import { Analytics } from '../components/Analytics'
// import { ProfileCard } from '../components/ProfileCard'
// import { PostCard } from '../components/PostCard'
import EditProfile from '../components/EditProfile'
import dp from '../assets/dp.jpg'
import CreatePost from '../components/CreatePost'
import PostCard from '../components/PostCard'
import { useEffect } from 'react'
import ConnectionBtn from '../components/ConnectionBtn'

const Feed = () => {
  const { userData, setUserData, edit, setEdit, startPost, setStartPost, posts, setPosts } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [suggestedUser, setSuggestedUser] = useState([])
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
    handleGetSuggestedUser()
  }, [])

  return (
    <div className='px-2 md:px-8 bg-[#F4F2EE] min-h-screen w-full flex flex-col items-center pt-16 lg:pt-20'>

      <TopBar2 />
      {edit && <EditProfile />}

      {/* Profile Card */}
      <div className="w-full md:w-[20%] relative md:fixed left-0 md:left-17">
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
        <div className="bg-white mt-2 shadow-sm rounded-lg hidden md:flex flex-col gap-4 px-6 py-4 items-start">
          <div className="w-full flex items-center justify-between">
            <p className="font-semibold text-sm cursor-pointer">Profile Viewers</p>
            <p className="text-blue-500">0</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="font-semibold text-sm cursor-pointer">Profile Impressions</p>
            <p className="text-blue-500">0</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 bg-white mt-2 rounded-lg shadow-md items-start py-4 px-6">
          <div className="font-semibold text-sm flex gap-4 cursor-pointer items-center"><LucideSave size={16} />Saved Items</div>
          <div className="font-semibold text-sm flex gap-4 cursor-pointer items-center"><GroupIcon size={16} />Groups</div>
          <div className="font-semibold text-sm flex gap-4 cursor-pointer items-center"><Newspaper size={16} />Newsletters</div>
          <div className="font-semibold text-sm flex gap-4 cursor-pointer items-center"><Calendar size={16} />Events</div>
        </div>
      </div>

      {startPost && <CreatePost />}
      <div className="w-full md:w-[50%] min-h-50 bg-[#F4F2EE] rounded-lg mt-3 md:mt-0 flex flex-col gap-4">

        {/* Start a Post Button */}
        <div className="flex items-center justify-center gap-4 w-full bg-white px-2 py-4 rounded-lg shadow-sm">
          <div className="h-14 w-14 rounded-full">
            <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
          </div>
          <button onClick={() => setStartPost(true)}
            className="w-3/4 border border-blue-500 text-blue-500 hover:bg-blue-500/10 py-3 px-8 rounded-full cursor-pointer flex items-center justify-start">
            Start a post
          </button>
        </div>

        {/* Post Card */}
        <div className="flex flex-col gap-4 min-h-screen">
          {posts.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
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

export default Feed