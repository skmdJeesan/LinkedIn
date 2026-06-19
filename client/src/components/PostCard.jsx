import React, { useContext, useEffect, useState } from 'react'
import dp from '../assets/dp.jpg'
import { Heart, HeartPlus, MessageCircle, Send, SendHorizonal } from 'lucide-react'
import moment from 'moment'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import { io } from "socket.io-client";
import ConnectionBtn from './ConnectionBtn'
import { Link } from 'react-router-dom'

const socket = io("http://localhost:8000");

const PostCard = ({ post }) => {
    let author = post.author
    let [read, setRead] = useState(false)
    let [likes, setLikes] = useState(post.like || [])
    let [comments, setComments] = useState(post.comment || [])
    let [openComments, setOpenComments] = useState(false)
    let [commentContent, setCommentContent] = useState('')
    let { serverUrl } = useContext(authDataContext)
    let { userData, setUserData, fetchAllPosts, handleGetProfile } = useContext(userDataContext)

    const handleLike = async () => {
        try {
            let res = await axios.get(`${serverUrl}/api/post/like/${post._id}`, { withCredentials: true })
            setLikes(res.data.like)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket.on("likeUpdated", ({postId, likes}) => {
            if(postId == post._id) setLikes(likes)
        });

        socket.on("commentUpdated", ({postId, comments}) => {
            if(postId == post._id) setComments(comments)
        });

        return () => {
            socket.off('likeUpdated')
            socket.off('commentUpdated')
        }
    }, [post._id])

    useEffect(() => {
        fetchAllPosts()
    }, [likes, comments])

    const handleComment = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post(`${serverUrl}/api/post/comment/${post._id}`, { content: commentContent }, { withCredentials: true })
            setComments(res.data.comment)
            setCommentContent('')
            // fetchAllPosts()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full min-h-50 bg-white shadow-md rounded-md flex flex-col py-4'>

            {/* profile card */}
            <div className="flex items-start justify-between px-4">
                <Link to={`/profile/${author.username}`} className="flex gap-3 items-start cursor-pointer">
                    <div className="h-15 w-15 rounded-full">
                        <img src={author.profileImage || dp} alt="" className="w-full h-full object-cover object-center rounded-full" />
                    </div>
                    <div className="">
                        <h1 className="text-lg font-semibold">{author.firstName + ' ' + author.lastName}</h1>
                        <h3 className="text-gray-600 text-base -mt-1">{author.headline}</h3>
                        <p className="text-xs -mt-1">{moment(post.createdAt).fromNow()}</p>
                    </div>
                </Link>
                <div className="">
                    {userData._id != author._id && <ConnectionBtn postAuthorId={author._id}/>}
                </div>
            </div>

            <div className="mb-2">
                <div className={`${post.description == '' ? '' : read ? 'min-h-14' : 'h-14'} px-4 py-2 overflow-hidden`}>
                    <p className="">{post.description}</p>
                </div>
                {post.description.length > 200 && <div onClick={() => setRead(prev => !prev)}
                    className="text-sm font-semibold hover:text-blue-500 cursor-pointer px-4 w-fit">
                    {read ? 'Read less' : 'Read more..'}
                </div>}
                {post.image && <div className='mt-2 w-full h-60 md:h-100'>
                    <img src={post.image} alt="" className="h-full w-full object-center object-cover" />
                </div>}
            </div>

            <div className="flex gap-3 px-4 py-2">
                <div onClick={handleLike}
                    className={`flex gap-1 items-center cursor-pointer py-0.5 px-1.5 rounded-md hover:bg-black/10 ${likes.includes(userData._id) ? 'bg-blue-400/20' : ''}`}>
                    <Heart size={18} className={`${likes.includes(userData._id) ? 'text-blue-600' : ''}`} /> {likes.length}
                </div>
                <div onClick={() => setOpenComments(prev => !prev)}
                    className="flex gap-1 items-center cursor-pointer p-px rounded-md hover:bg-black/10">
                    <MessageCircle size={18} className='' /> {comments.length}
                </div>
            </div>

            <div className={`${openComments ? '' : 'hidden'} px-4 py-2`}>
                <form className='w-full flex justify-between gap-2 items-center border-2 rounded-full border-gray-400 py-1 px-2' onSubmit={(e) => handleComment(e)}>
                    <input
                        type="text" placeholder='Leave a Comment..'
                        className='outline-none border-none w-full px-2'
                        value={commentContent} onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button className="cursor-pointer hover:bg-blue-500/10 rounded-full p-1"><SendHorizonal size={20} className='text-blue-500' /></button>
                </form>
                <div className="flex flex-col gap-2 mt-2">
                    {comments.map((c, i) => (
                        <div key={i} className="flex flex-col gap-1 mt-4 border-b border-b-gray-400 rounded-lg">
                            <div className="flex items-start justify-between px-1">
                                <div className="flex gap-2 items-start cursor-pointer" onClick={() => handleGetProfile(author.username)}>
                                    <div className="h-10 w-10 rounded-full">
                                        <img src={c.user?.profileImage || dp} alt="" className="w-full h-full bg-cover rounded-full" />
                                    </div>
                                    <div className="">
                                        <h1 className="text-base font-semibold">{c.user?.firstName + ' ' + c.user?.lastName}</h1>
                                        {/* <h3 className="text-gray-600 text-sm -mt-1">{c.user?.headline}</h3> */}
                                        <p className="text-xs -mt-1">{moment(c.createdAt).fromNow()}</p>
                                    </div>
                                </div>
                                <div className="">
                                    {userData._id != c.user._id && <ConnectionBtn postAuthorId={author._id}/>}
                                </div>
                            </div>
                            <div className="text-sm p-1 ml-8">{c.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostCard