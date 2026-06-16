import { Camera, Loader2, Plus, PlusCircle, X } from 'lucide-react'
import React, { useContext, useState, useRef } from 'react'
import { userDataContext } from '../context/UserContext'
import dp from '../assets/dp.jpg'
import '../App.css'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

const EditProfile = () => {
  let { userData, setUserData, edit, setEdit } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)

  let [firstName, setFirstName] = useState(userData ? userData.firstName : '')
  let [lastName, setLastName] = useState(userData ? userData.lastName : '')
  let [username, setUsername] = useState(userData ? userData.username : '')
  let [email, setEmail] = useState(userData ? userData.email : '')
  let [headline, setHeadline] = useState(userData ? userData.headline : '')
  let [location, setLocation] = useState(userData ? userData.location : '')
  let [gender, setGender] = useState(userData ? userData.gender : '')
  let [skills, setSkills] = useState(userData ? userData.skills : [])
  let [newSkill, setNewSkill] = useState('')
  let [education, setEducation] = useState(userData ? userData.education : [])
  let [newEducation, setNewEducation] = useState({ college: '', degree: '', fieldOfStudy: '' })
  let [experience, setExperience] = useState(userData ? userData.experience : [])
  let [newExperience, setNewExperience] = useState({ title: '', company: '', description: '' })
  let [loading, setLoading] = useState(false)

  let [frontendProfileImg, setFrontendProfileImg] = useState(userData ? userData.profileImage : dp)
  let [backendProfileImg, setBackendProfileImg] = useState(null)
  let [frontendCoverImg, setFrontendCoverImg] = useState(userData ? userData.coverImage : '')
  let [backendCoverImg, setBackendCoverImg] = useState(null)

  const profileImg = useRef(null)
  const coverImg = useRef(null)

  const handleProfileImg = (e) => {
    let file = e.target.files[0]
    if (file) {
      setFrontendProfileImg(URL.createObjectURL(file))
      setBackendProfileImg(file)
    }
  }

  const handleCoverImg = (e) => {
    let file = e.target.files[0]
    if (file) {
      setFrontendCoverImg(URL.createObjectURL(file))
      setBackendCoverImg(file)
    }
  }

  const handleAddSkill = () => {
    // e.preventDefault()
    if (newSkill.trim() !== '' && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleAddEducation = () => {
    if (newEducation.college.trim() !== '' && newEducation.degree.trim() !== '' && newEducation.fieldOfStudy.trim() !== '') {
      setEducation([...education, newEducation])
      setNewEducation({ college: '', degree: '', fieldOfStudy: '' })
    }
  }

  const handleAddExperience = () => {
    if (newExperience.title.trim() !== '' && newExperience.company.trim() !== '' && newExperience.description.trim() !== '') {
      setExperience([...experience, newExperience])
      setNewExperience({ title: '', company: '', description: '' })
    }
  }

  const handleUpdateProfile = async () => {
    setLoading(true)
    try {
      // Prepare form data and make API call to save profile changes
      let formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('headline', headline)
      formData.append('location', location)
      formData.append('gender', gender)
      formData.append('skills', JSON.stringify(skills))
      formData.append('education', JSON.stringify(education))
      formData.append('experience', JSON.stringify(experience))
      if (backendProfileImg) formData.append('profileImg', backendProfileImg)
      if (backendCoverImg) formData.append('coverImg', backendCoverImg)
      // Make API call to update profile (using fetch or axios)
      const res = await axios.put(serverUrl + '/api/user/update-profile', formData, { withCredentials: true })
      setUserData(res.data)
      setLoading(false)
      setEdit(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  return (
    <div className='fixed top-0 left-0 z-100 w-full h-screen flex items-center justify-center'>

      <input type='file' accept='image/*' className='hidden' ref={profileImg} onChange={handleProfileImg}/>
      <input type='file' accept='image/*' className='hidden' ref={coverImg} onChange={handleCoverImg}/>

      <div className="w-full h-full bg-black opacity-[0.7] absolute"></div>
      <div onClick={() => setEdit(false)}
        className="absolute top-6 right-8">
        <X className='font-bold cursor-pointer bg-white rounded-full p-1 w-7 h-7' size={20} />
      </div>

      <div className="bg-white w-[90%] max-w-150 h-150 shadow-xl rounded-2xl absolute z-200 p-2 overflow-auto hide-scrollbar">
        {/* Cover Image */}
        <div className="w-full h-38 bg-gray-500 rounded-lg overflow-hidden">
          <img src={frontendCoverImg} alt="" className="w-full h-full bg-cover rounded" />
          <div onClick={() => coverImg.current.click()}
            className="absolute top-4 right-4 rounded-full flex items-center justify-center">
            <Camera size={20} className='font-bold cursor-pointer h-5 w-6 rounded-full text-white' />
          </div>
        </div>

        {/* Profile Image */}
        <div className="h-20 w-20 rounded-full absolute top-28 left-8">
          <img src={frontendProfileImg} alt="" className="w-full h-full bg-cover rounded-full" />
          <div onClick={() => profileImg.current.click()}
            className="absolute top-[65%] right-0 rounded-full flex items-center justify-center">
            <Plus size={16} className='font-bold cursor-pointer bg-blue-500 h-5 w-5 rounded-full p-1 text-white' />
          </div>
        </div>

        {/* Input details */}
        <div className="w-full flex flex-col mt-12 p-2">
          <h1 className="font-bold text-base">Basic info</h1>
          <div className="flex gap-4 mt-4">
            <input
              type="text" placeholder='First Name'
              className='border border-gray-300 rounded-lg p-2 w-full'
              value={firstName} onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text" placeholder='Last Name'
              className='border border-gray-300 rounded-lg p-2 w-full'
              value={lastName} onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {/* <input
            type="text" placeholder='Username'
            className='border border-gray-300 rounded-lg p-2 w-full mt-4'
            value={username} onChange={(e) => setUsername(e.target.value)}
          /> */}
          {/* <input
            type="text" placeholder='Email' disabled
            className='border border-gray-300 rounded-lg p-2 w-full mt-4'
            value={email} onChange={(e) => setEmail(e.target.value)}
          /> */}
          <input
            type="text" placeholder='Headline'
            className='border border-gray-300 rounded-lg p-2 w-full mt-4'
            value={headline} onChange={(e) => setHeadline(e.target.value)}
          />
          <input
            type="text" placeholder='Location'
            className='border border-gray-300 rounded-lg p-2 w-full mt-4'
            value={location} onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text" placeholder='Gender (eg: Male, Female, Other)'
            className='border border-gray-300 rounded-lg p-2 w-full mt-4'
            value={gender} onChange={(e) => setGender(e.target.value)}
          />

          {/* Skills Input */}
          <div className="w-full mt-4 flex flex-col gap-2">
            <h1 className="font-semibold text-base ml-1">Skills</h1>
            {skills && <div className="flex flex-wrap gap-2">
              {skills.length === 0 && <p className='text-gray-500 text-sm ml-1'>No skills added yet.</p>}
              {skills.map((skill, i) => (
                <span key={i} className="bg-blue-500 text-white py-1 px-3 rounded-full text-sm flex items-center gap-2">
                  {skill}
                  <X size={14} className='font-bold cursor-pointer ml-2' onClick={() => setSkills(skills.filter(s => s !== skill))} />
                </span>
              ))}
            </div>}
            <div className='flex items-center gap-2'>
              <input
                type='text' placeholder='Add a skill...'
                className='border border-gray-300 rounded-lg p-2 w-full mt-4'
                value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
              />
              <button onClick={handleAddSkill} className='bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 cursor-pointer mt-4'>
                <PlusCircle size={20} className='font-bold cursor-pointer h-5 w-6 rounded-full text-white' />
              </button>
            </div>
          </div>

          {/* Education Input - can be added similarly with dynamic fields for college, degree and field of study */}
          <div className="w-full mt-4 flex flex-col gap-2">
            <h1 className="font-semibold text-base ml-1">Education</h1>
            {education && <div className="flex flex-wrap gap-2">
              {education.length === 0 && <p className='text-gray-500 text-sm ml-1'>No education added yet.</p>}
              {education.map((edu, i) => (
                <div key={i} className="bg-gray-200 text-black py-2 px-3 rounded-lg text-base flex items-start gap-2">
                  <div className="flex flex-col">
                    <span>College: {edu.college}</span>
                    <span>Degree: {edu.degree}</span>
                    <span>Field of Study: {edu.fieldOfStudy}</span>
                  </div>
                  <X size={14} className='font-bold cursor-pointer ml-2' onClick={() => setEducation(education.filter(e => e !== edu))} />
                </div>
              ))}
            </div>}
            <div className='flex items-center gap-2'>
              <input
                type='text' placeholder='College'
                className='border border-gray-300 rounded-lg p-2 w-full mt-4'
                value={newEducation.college} onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })}
              />
              <input
                type='text' placeholder='Degree'
                className='border border-gray-300 rounded-lg p-2 w-full mt-4'
                value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              />
              <input
                type='text' placeholder='Field of Study'
                className='border border-gray-300 rounded-lg p-2 w-full mt-4'
                value={newEducation.fieldOfStudy} onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
              />
              <button onClick={handleAddEducation} className='bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 cursor-pointer mt-4'>
                <PlusCircle size={20} className='font-bold cursor-pointer h-5 w-6 rounded-full text-white' />
              </button>
            </div>
          </div>

          {/* Experience Input - can be added similarly with dynamic fields for title, company and description */}
          <div className="w-full mt-4 flex flex-col gap-2">
            <h1 className="font-semibold text-base ml-1">Experience</h1>
            {experience && <div className="flex flex-wrap gap-2">
              {experience.length === 0 && <p className='text-gray-500 text-sm ml-1'>No experience added yet.</p>}
              {experience.map((exp, i) => (
                <div key={i} className="bg-gray-200 text-black py-2 px-3 rounded-lg text-base flex items-start gap-2">
                  <div className="flex flex-col">
                    <span>Company: {exp.company}</span>
                    <span>Role: {exp.title}</span>
                    <span>Description: {exp.description}</span>
                  </div>
                  <X size={24} className='font-bold cursor-pointer ml-2' onClick={() => setExperience(experience.filter(e => e !== exp))} />
                </div>
              ))}
            </div>}
            <div className='flex items-center gap-2'>
              <input
                type='text' placeholder='Title'
                className='border border-gray-300 rounded-lg p-2 w-full mt-4'
                value={newExperience.title} onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              />
              <input
                type='text' placeholder='Company'
                className='border border-gray-300 rounded-lg p-2 w-full mt-4'
                value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              />
              <input
                type='text' placeholder='Description'
                className='border border-gray-300 rounded-lg p-2 w-full mt-4'
                value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              />
              <button onClick={handleAddExperience} className='bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 cursor-pointer mt-4'>
                <PlusCircle size={20} className='font-bold cursor-pointer h-5 w-6 rounded-full text-white' />
              </button>
            </div>
          </div>

          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className='bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 cursor-pointer mt-4 flex items-center justify-center'>
            {loading ? <Loader2 className='animate-spin text-white' size={16} /> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile