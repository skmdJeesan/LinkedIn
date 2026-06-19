import React from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { Image, ImageIcon, ImagePlay, ImagePlus, Loader2, X } from 'lucide-react'
import dp from '../assets/dp.jpg'
import { useState } from 'react'
import axios from 'axios'

const CreatePost = () => {
  let { userData, setUserData, startPost, setStartPost, fetchAllPosts } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  let image = useRef()
  const frontendProfileImg = userData?.profileImage || dp
  let [loading, setLoading] = useState(false)
  let [frontendImage, setFrontendImage] = useState('')
  let [backendImage, setBackendImage] = useState('')
  let [description, setDescription] = useState('')

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleCreatePost = async () => {
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append('description', description)
      if(backendImage) formData.append('image', backendImage)
      let res = await axios.post(serverUrl + '/api/post/create', formData, {withCredentials: true})
      // console.log(res.data)
      fetchAllPosts()
      setLoading(false)
      setStartPost(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='fixed top-0 left-0 z-500 w-full h-screen flex items-center justify-center'>

      <input type='file' accept='image/*' className='hidden' ref={image} onChange={handleImage} />

      <div className="w-full h-full bg-black opacity-[0.7] absolute"></div>
      <div onClick={() => setStartPost(false)}
        className="absolute top-2 md:top-10 right-2 md:right-8 z-600">
        <X className='font-bold cursor-pointer bg-white rounded-full p-1 w-7 h-7' size={20} />
      </div>

      <div className="bg-white w-[90%] max-w-180 min-h-100 shadow-xl rounded-2xl absolute mt-5 md:mt-0 z-200 px-2 md:px-3 py-2 overflow-auto hide-scrollbar flex flex-col gap-4">
        
        <div className="flex items-center justify-start gap-4 w-full bg-white px-2 py-4">
          <div className="h-14 w-14 rounded-full">
            <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">{userData.firstName} {userData.lastName}</h1>
            <p className="text-sm text-gray-600">Post to Anyone</p>
          </div>
        </div>

        <textarea placeholder='What do you want to talk about?'
          value={description} onChange={(e) => setDescription(e.target.value)}
          className={`text-lg resize-none w-full ${frontendImage ? 'h-40' : 'h-60'} outline-none border-none p-2`}
        />

        {frontendImage && <div className="overflow-hidden w-full h-60 flex items-center justify-center rounded-md ">
          <img src={frontendImage || ''} alt="Image" className="w-full md:w-1/2 h-full bg-cover" />
        </div>}

        <div className="border-b-2 pb-1.5 pl-2 border-gray-300">
          <ImagePlus className='text-gray-600 cursor-pointer' size={22} onClick={() => image.current.click()} />
        </div>

        <div className="flex items-center justify-end -mt-1 pr-2">
          <button
            onClick={handleCreatePost}
            disabled={loading}
            className='bg-blue-500 text-white py-1.5 px-4 rounded-full hover:bg-blue-600 cursor-pointer flex items-center justify-center w-fit'>
            {loading ? <Loader2 className='animate-spin text-white' size={16} /> : 'Post'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost