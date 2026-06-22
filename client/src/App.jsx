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
  const { userData, authLoading } = useContext(userDataContext)

  const authProtect = (component) => {
    if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    return userData ? component : <Navigate to="/login" />
  }

  return <div>
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/feed' element={authProtect(<Feed />)} />
      <Route path='/network' element={authProtect(<Network />)} />
      <Route path='/notification' element={authProtect(<Notification />)} />
      <Route path='/messaging' element={authProtect(<Messaging />)} />
      <Route path='/jobs' element={authProtect(<Jobs />)} />
      <Route path='/profile/me' element={authProtect(<MyProfile />)} />
      <Route path='/profile/:username' element={authProtect(<UserProfile />)} />
      <Route path='/login' element={userData ? <Navigate to="/feed" /> : <Login />} />
      <Route path='/register' element={userData ? <Navigate to="/feed" /> : <Register />} />
      <Route path='/my-posts' element={authProtect(<MyPosts />)} />
      <Route path="/verify-email/:verifyToken" element={<VerifyEmail />} />
      <Route path="/check-email" element={<CheckEmail />} />
    </Routes>
  </div>
}

export default App
