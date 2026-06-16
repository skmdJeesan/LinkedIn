import React from 'react'
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const userDataContext = createContext();
const UserContext = ({ children }) => {
  const serverUrl = useContext(authDataContext).serverUrl
  const [userData, setUserData] = useState(null)
  const [edit, setEdit] = useState(false)

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/current-user`, { withCredentials: true });
      setUserData(res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null); // Set userData to null if there's an error fetching data
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  let value = {userData, setUserData, edit, setEdit}

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>

  )
}

export default UserContext