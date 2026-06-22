import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ForgetPass = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/auth/forgot-password`,
        { email }
      );
      alert(res.data.message);
      setEmail("");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 left-10 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsfY4ztnbhoAI-TUGV7csHBL5w4TjF40Gdg&s"
          alt="LinkedIn"
          className="h-14"
        />
      </div>
      <div className='flex items-center justify-center w-full h-screen'>
        <form className="flex flex-col gap-2 w-3/4 md:w-1/4" onSubmit={handleSubmit}>
          <input
            type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            className="border p-3 rounded"
          />
          <button type="submit" disabled={loading}
            className="w-full h-12 bg-[#0A66C2] rounded-full text-white font-medium hover:bg-[#004182] mt-2 cursor-pointer flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>

  )
}

export default ForgetPass