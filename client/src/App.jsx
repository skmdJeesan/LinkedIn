import { useState, useContext } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { userDataContext } from './context/UserContext'
import Feed from './pages/Feed'
import Network from './components/Network'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import MyPosts from './components/MyPosts'
import Notification from './pages/Notification'
import Messaging from './pages/Messaging'
import Jobs from './pages/Jobs'
import CheckEmail from './components/CheckEmail'
import VerifyEmail from './pages/VerifyEmail'

function App() {
  const userData = useContext(userDataContext).userData
  return <div>
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/feed' element={userData ? <Feed /> : <Navigate to="/login" />} />
      <Route path='/network' element={userData ? <Network /> : <Navigate to="/login" />} />
      <Route path='/notification' element={userData ? <Notification /> : <Navigate to="/login" />} />
      <Route path='/messaging' element={userData ? <Messaging /> : <Navigate to="/login" />} />
      <Route path='/jobs' element={userData ? <Jobs /> : <Navigate to="/login" />} />
      <Route path='/profile/me' element={userData ? <MyProfile /> : <Navigate to="/login" />} />
      <Route path='/profile/:username' element={userData ? <UserProfile /> : <Navigate to="/login" />} />
      {/* <Route path='/feed' element={<Feed />}/> */}
      <Route path='/login' element={userData ? <Navigate to="/feed" /> : <Login />} />
      <Route path='/register' element={userData ? <Navigate to="/feed" /> : <Register />} />
      <Route path='/my-posts' element={userData ? <MyPosts /> : <Navigate to="/login" />} />
      <Route path="/verify-email/:verifyToken" element={<VerifyEmail />} />
      <Route path="/check-email" element={<CheckEmail />} />
    </Routes>
  </div>
}

export default App
