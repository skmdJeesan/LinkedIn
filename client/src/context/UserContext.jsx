import React from 'react'
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";

export const socket = io("http://localhost:8000");
export const userDataContext = createContext();
const UserContext = ({ children }) => {
  const serverUrl = useContext(authDataContext).serverUrl
  const [userData, setUserData] = useState(null)
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
      setUserData(null); // Set userData to null if there's an error fetching data
    }
  };

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/post/get-all`, { withCredentials: true })
      setPosts(res.data)
    } catch (error) {
      console.error('Error fetching all posts:', error);
      setPosts(null); // Set post Data to null if there's an error fetching data
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchAllPosts();
  }, []);

  let value = { userData, setUserData, edit, setEdit, startPost, setStartPost, posts, setPosts, fetchAllPosts }

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>

  )
}

export default UserContext