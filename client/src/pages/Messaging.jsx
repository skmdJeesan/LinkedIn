import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import dp from '../assets/dp.jpg'
import { TopBar2 } from '../components/TopBar2'

const Messaging = () => {
  const { userData, setUserData, edit, setEdit } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const frontendProfileImg = userData?.profileImage || dp
  const frontendCoverImg = userData?.coverImage || ''
  //const [suggestedUser, setSuggestedUser] = useState([])

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

      <div className="flex flex-col items-center justify-center text-xl gap-2 w-full md:w-1/2 px-0 md:px-3 h-100 bg-white rounded-xl shadow-sm">
          404 page not found!
      </div>

      {/* <div className="w-full md:w-[22%] min-h-50 bg-white shadow-sm rounded-lg py-2 hidden md:flex flex-col gap-4 md:fixed right-0 md:right-12">
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
      </div> */}
    </div>
  )
}

export default Messaging