import React from 'react'
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SERVER_BASE_URL);
export const userDataContext = createContext();
const UserContext = ({ children }) => {
  const serverUrl = useContext(authDataContext).serverUrl
  const [userData, setUserData] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [startPost, setStartPost] = useState(false)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/current-user`, { withCredentials: true });
      setUserData(res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/post/get-all`, { withCredentials: true })
      setPosts(res.data)
    } catch (error) {
      console.error('Error fetching all posts:', error);
      setPosts([]); // Reset to empty array if there's an error fetching data
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchAllPosts();
  }, []);

  let value = { userData, authLoading, setUserData, edit, setEdit, startPost, setStartPost, posts, setPosts, fetchAllPosts, fetchUserData }

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>

  )
}

export default UserContext
