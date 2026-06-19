import React, { useContext, useEffect, useState } from 'react'
import { TopBar2 } from './TopBar2'
import { userDataContext } from '../context/UserContext'
import dp from '../assets/dp.jpg'
import { Gem, MapPin, Pen, Plus, University } from 'lucide-react'
import EditProfile from './EditProfile'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import ConnectionBtn from './ConnectionBtn'

const UserProfile = () => {
  const { serverUrl } = useContext(authDataContext)
  const { username } = useParams();
  const [profileData, setprofileData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${serverUrl}/api/user/profile/${username}`, { withCredentials: true });
      setprofileData(res.data);
    };
    fetchUser();
  }, [username]);

  const { userData, edit, setEdit, posts, setPosts } = useContext(userDataContext)
  const frontendProfileImg = profileData?.profileImage || dp
  const frontendCoverImg = profileData?.coverImage || ''
  const fullName = profileData?.firstName ? `${profileData.firstName} ${profileData.lastName}` : profileData?.username || 'Your Name'
  const headline = profileData?.headline || 'Add a headline to tell people what you do.'
  const navigate = useNavigate()
  const isOwner = userData?._id === profileData?._id;

  return (
    <div className='bg-[#F4F2EE] pt-14 lg:pt-20 min-h-screen w-full'>
      <TopBar2 />
      {edit && <EditProfile />}
      <div className='px-2 md:px-10 py-2'>
        <div className='max-w-6xl mx-auto flex flex-col gap-5'>

          <div className='bg-white shadow-sm rounded-xl overflow-hidden relative'>
            <div className='h-40 bg-gray-200 relative'>
              <img
                src={frontendCoverImg}
                alt='Cover'
                className='w-full h-full object-cover'
              />
              <div className='absolute left-6 -bottom-14'>
                <div className='h-28 w-28 rounded-full border-4 border-white overflow-hidden bg-gray-200 relative'>
                  <img src={frontendProfileImg} alt='Profile' className='w-full h-full object-cover' />
                </div>
              </div>
              {isOwner && <div onClick={() => setEdit(true)}
                className="absolute top-45 right-[75%] md:right-[88.5%] cursor-pointer z-200 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Plus size={22} className='text-white' />
              </div>}
            </div>
            <div className='pt-16 pb-6 px-6 flex items-start justify-between'>
              <div className="">
                <h1 className='text-2xl font-semibold'>{fullName}</h1>
                <p className='text-gray-600'>{headline}</p>
                <div className='mt-2 flex flex-wrap gap-3 text-sm text-gray-600'>
                  {profileData?.location && (
                    <span className='flex items-center gap-2'>
                      <MapPin size={16} />
                      {profileData.location}
                    </span>
                  )}
                  {profileData?.username && <span className='lowercase'>@{profileData.username}</span>}
                </div>
              </div>
              <div className="">
                <ConnectionBtn postAuthorId={profileData?._id} />
              </div>
            </div>

            {isOwner && <div onClick={() => setEdit(true)}
              className="absolute top-4 right-4 cursor-pointer z-100">
              <Pen size={20} className='text-white hover:text-blue-500' />
            </div>}
          </div>

          <div className='grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-5'>

            <div className='flex flex-col gap-5'>
              <section className='bg-white shadow-sm rounded-xl p-6'>
                <h2 className='text-lg font-semibold flex items-center gap-2'>
                  About
                  {isOwner && <div onClick={() => setEdit(true)} className="cursor-pointer"><Pen size={12} className='text-blue-500' /></div>}
                </h2>
                <p className='mt-1 text-gray-700'>
                  {headline}
                </p>
                <div className='mt-5 grid gap-4 sm:grid-cols-2'>
                  {/* <div className='rounded-2xl bg-slate-50 p-4'>
                    <p className='text-xs uppercase tracking-[0.18em] text-gray-500'>Location</p>
                    <p className='mt-2 text-sm text-gray-800'>
                      {profileData?.location || 'Not added yet'}
                    </p>
                  </div>
                  <div className='rounded-2xl bg-slate-50 p-4'>
                    <p className='text-xs uppercase tracking-[0.18em] text-gray-500'>Gender</p>
                    <p className='mt-2 text-sm text-gray-800'>
                      {profileData?.gender || 'Not added yet'}
                    </p>
                  </div> */}
                  <div className='rounded-2xl sm:col-span-2 border border-gray-300 px-8 py-4 relative'>
                    <p className='text-lg font-semibold flex items-center gap-2'><Gem size={18} /> Top Skills</p>
                    <p className='text-base text-gray-800 pl-6'>
                      {profileData?.skills?.length ? profileData.skills.join(' • ') : 'No skills added yet.'}
                    </p>
                    {isOwner && <div onClick={() => setEdit(true)}
                      className="absolute top-4 right-4 cursor-pointer">
                      <Pen size={16} className='text-blue-500' />
                    </div>}
                  </div>
                </div>
              </section>

              <section className='bg-white shadow-sm rounded-xl p-6'>
                <h2 className='text-lg font-semibold flex items-center gap-2'>
                  Experience
                  {isOwner && <div onClick={() => setEdit(true)} className="cursor-pointer"><Pen size={12} className='text-blue-500' /></div>}
                </h2>
                <div className='mt-1 space-y-3'>
                  {profileData?.experience?.length ? (
                    profileData.experience.map((exp, index) => (
                      <div key={index} className='rounded-2xl bg-gray-200 p-4'>
                        <p className='font-semibold'>{exp.title || 'Role'}</p>
                        <p className='text-sm text-gray-600'>{exp.company || 'Company'}</p>
                        <p className='mt-2 text-sm text-gray-700'>
                          {exp.description || 'No description provided.'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className='text-gray-500'>No experience added yet.</p>
                  )}
                </div>
              </section>

              <section className='bg-white shadow-sm rounded-xl p-6'>
                <h2 className='text-lg font-semibold flex items-center gap-2'>
                  Education
                  {isOwner && <div onClick={() => setEdit(true)} className="cursor-pointer"><Pen size={12} className='text-blue-500' /></div>}
                </h2>
                <div className='mt-1 flex flex-wrap gap-2'>
                  {profileData?.education?.length ? (
                    profileData.education.map((edu, index) => (
                      <div key={index} className='rounded-2xl p-4 flex items-start w-fit gap-4 bg-gray-200'>
                        <div className="pt-1"><University size={28} /></div>
                        <div className="flex flex-col">
                          <p className='font-semibold'>{edu.college || 'College'}</p>
                          <p className='text-sm text-gray-600 -mt-1'>
                            {edu.degree || 'Degree'} · {edu.fieldOfStudy || 'Field of study'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-gray-500'>No education added yet.</p>
                  )}
                </div>
              </section>
            </div>

            <aside className='space-y-5'>
              <section className='bg-white shadow-sm rounded-xl p-6'>
                <h2 className='text-lg font-semibold'>Profile details</h2>
                <div className='mt-2 text-sm text-gray-700'>
                  <div onClick={() => navigate('/network')}
                    className='bg-slate-50 p-2 flex items-start justify-between hover:border-b hover:border-b-blue-500 hover:text-blue-500'>
                    <p className='text-base uppercase cursor-pointer'>See All Connections</p>
                    <p className='mt-1 font-semibold text-blue-500'>
                      {profileData?.connection?.length ?? 0}
                    </p>
                  </div>
                  <div className='bg-slate-200 p-2 flex items-start justify-between cursor-not-allowed mt-2 rounded-md'>
                    <p className='text-base uppercase '>See All Posts</p>
                    <p className='mt-1 font-semibold'>
                      NA
                    </p>
                  </div>
                  <div className='hidden rounded-2xl bg-slate-50 p-2 '>
                    <p className='text-gray-500 text-xs uppercase'>Profile strength</p>
                    <p className='mt-1 text-gray-700'>Keep your profile complete to reach more people.</p>
                  </div>
                </div>
              </section>

              {/* <section className='bg-white shadow-sm rounded-xl p-6'>
                <h2 className='text-lg font-semibold'>Highlights</h2>
                <div className='mt-2 flex flex-col gap-3 text-sm text-gray-700'>
                  <div className='rounded-2xl bg-slate-50 p-4'>
                    {profileData?.headline ? 'Headline added' : 'Add a headline'}
                  </div>
                  <div className='rounded-2xl bg-slate-50 p-4'>
                    {profileData?.skills?.length ? `${profileData.skills.length} skills listed` : 'Add skills to improve your profile'}
                  </div>
                </div>
              </section> */}
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile