
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { Loader2 } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    let { serverUrl } = useContext(authDataContext)
    const { setUserData, fetchUserData, fetchAllPosts } = useContext(userDataContext)
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            let res = await axios.post(serverUrl + '/api/auth/login', {
                email, password
            }, { withCredentials: true })
            console.log(res.data)
            setLoading(false)
            setEmail("")
            setPassword("")
            // update global user data so protected routes allow access
            setUserData(res.data.user)
            await Promise.all([fetchUserData(), fetchAllPosts()])
            navigate('/feed')
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Login failed')
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

            <div className="max-w-md mx-auto md:shadow-xl p-10 rounded-2xl border-none md:border-2 md:border-gray-200">
                {/* Heading */}
                <div className="mb-4">
                    <h1 className="text-4xl md:text-5xl font-light mb-4">
                        Sign in
                    </h1>
                    <p className="text-sm text-gray-600">
                        New to LinkedIn?{" "}
                        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/register')}>
                            Join now
                        </span>
                    </p>
                </div>

                <form action="" className="flex flex-col gap-4" onSubmit={handleLogin}>
                    
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

                    <div className="flex items-center justify-end px-2 -mt-3">
                        <h3 onClick={() => navigate('/forget-password')} 
                            className="text-blue-500 hover:underline cursor-pointer text-sm">
                            Forget Password?
                        </h3>
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

                    {/* Sign in Button */}
                    <button type="submit" disabled={loading}
                        className="w-full h-12 bg-[#0A66C2] rounded-full text-white font-medium hover:bg-[#004182] mt-2 cursor-pointer flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign in"}
                    </button>

                </form>

            </div>
        </div>
    );
}