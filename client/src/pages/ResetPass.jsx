import axios from 'axios';
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { authDataContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPass = () => {
  const { resetToken } = useParams();
  const { serverUrl } = useContext(authDataContext)
  const [newPassword, setNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (newPassword.trim() !== confirmPassword.trim()) {
      alert("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/auth/reset-password/${resetToken}`,
        { password: newPassword }
      );
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 left-10 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsfY4ztnbhoAI-TUGV7csHBL5w4TjF40Gdg&s"
          alt="LinkedIn"
          className="h-14"
        />
      </div>
      <div className='flex items-center justify-center w-full h-screen'>
        <form className="flex flex-col gap-2 w-3/4 md:w-1/4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="border p-3 rounded w-full"
            />
            <p className="text-sm text-[#0A66C2] font-semibold cursor-pointer absolute right-2 top-4" onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? "Hide" : "Show"}
            </p>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="border p-3 rounded w-full"
            />
            <p className="text-sm text-[#0A66C2] font-semibold cursor-pointer absolute right-2 top-4" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "Hide" : "Show"}
            </p>
          </div>
          <button type="submit" disabled={loading}
            className="w-full h-12 bg-[#0A66C2] rounded-full text-white font-medium hover:bg-[#004182] mt-2 cursor-pointer flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPass