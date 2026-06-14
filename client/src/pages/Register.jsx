
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import {authDataContext} from '../context/AuthContext'
import axios from 'axios'
import { Loader2 } from "lucide-react";
import { userDataContext } from '../context/UserContext'

export default function Register() {
  const { setUserData } = useContext(userDataContext)
  const navigate = useNavigate();
  let {serverUrl} = useContext(authDataContext)
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let res = await axios.post(serverUrl + '/api/auth/register', {
        firstName, lastName, username, email, password
      }, {withCredentials: true})
      console.log(res.data)
      setLoading(false)
      setFirstName("")
      setLastName("")
      setUsername("")
      setEmail("")
      setPassword("")
      setUserData(res.data.user)
      navigate('/feed')
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="px-10 py-4 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsfY4ztnbhoAI-TUGV7csHBL5w4TjF40Gdg&s"
          alt="LinkedIn"
          className="h-14"
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl text-center font-light mb-4 md:mb-6">
        Join LinkedIn now — it's free!
      </h1>

      <div className="max-w-md mx-auto md:shadow-xl p-10 rounded-2xl border-none md:border-2 md:border-gray-200">
        <form action="" className="flex flex-col gap-4" onSubmit={handleRegister}>
          {/* Name */}
          <div className="w-full flex items-center gap-3">
            <input
              type="text" value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-1/2 border p-3 rounded"
            />

            <input
              type="text" value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-1/2 border p-3 rounded min-w-0"
            />
          </div>

          {/* Username */}
          <input
            type="text" value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border p-3 rounded"
          />

          {/* Email */}
          <input
            type="email" value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-3 rounded"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-3 rounded w-full"
            />
            <p className="text-sm text-[#0A66C2] font-semibold cursor-pointer absolute right-2 top-4" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </p>
          </div>

          {/* Terms */}
          <p className="text-sm text-gray-600 text-center mt-4">
            By clicking Continue, you agree to the LinkedIn{" "}
            <span className="text-[#0A66C2] font-semibold cursor-pointer">
              User Agreement
            </span>
            ,{" "}
            <span className="text-[#0A66C2] font-semibold cursor-pointer">
              Privacy Policy
            </span>
            , and{" "}
            <span className="text-[#0A66C2] font-semibold cursor-pointer">
              Cookie Policy
            </span>
            .
          </p>
          
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Register Button */}
          <button type="submit" disabled={loading}
            className="w-full h-12 bg-[#0A66C2] rounded-full text-white font-medium hover:bg-[#004182] mt-2 cursor-pointer flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Agree & Join"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full h-12 border rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 cursor-pointer"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5"
            />
            Continue with Google
          </button>

          {/* Sign In */}
          <p className="text-center">
            Already on LinkedIn?{" "}
            <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/login')}>
              Sign in
            </span>
          </p>
        </form>
      </div>


      {/* Footer */}
      <div className="text-center mt-8 text-gray-700 mb-4">
        Looking to create a page for a business?{" "}
        <span className="text-[#0A66C2] font-semibold cursor-pointer">
          Get help
        </span>
      </div>
    </div>
  );
}