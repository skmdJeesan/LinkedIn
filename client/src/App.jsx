import { useState, useContext } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { userDataContext } from './context/UserContext'
import Feed from './pages/Feed'

function App() {
  const userData = useContext(userDataContext).userData
  return <div>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/feed' element={userData ? <Feed /> : <Navigate to="/login" />}/>
      
      <Route path='/login' element={userData ? <Navigate to="/feed" /> : <Login/>}/>
      <Route path='/register' element={userData ? <Navigate to="/feed" /> : <Register/>}/>
    </Routes>
  </div>
}

export default App
