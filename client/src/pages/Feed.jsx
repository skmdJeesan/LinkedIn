import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'
import { TopBar2 } from '../components/TopBar2'

const Feed = () => {
  const { userData, setUserData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)

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
    // <div className='p-10'>
    //   <h1 className='text-2xl font-bold mb-1'>Welcome to the Feed, <span className='font-bold text-[#0077B6]'>{userData ? userData.lastName : 'Guest'}!</span></h1>
    //   <p className='text-gray-600 mb-2'>Here's what's happening with your network.</p>
    //   <button onClick={handleLogout}
    //     className='bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 cursor-pointer'>
    //     {loading ? <Loader2 className='animate-spin' size={20} /> : 'Logout'}
    //   </button>
    // </div>

    <div>
      <TopBar2/>
    </div>
  )
}

export default Feed