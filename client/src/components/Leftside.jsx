import { useNavigate } from "react-router-dom";

export function Leftside() {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-3/4 lg:w-[55%] px-4 md:px-0">
      <h1 className="text-2xl md:text-4xl lg:text-[56px] leading-tighter">
        Find jobs, connections, insights and more to grow your career
      </h1>

      <div className="mt-8 flex flex-col gap-4">
        <button className="cursor-pointer w-full md:w-3/4 h-14 border border-gray-400 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>

        <button onClick={() => navigate('/login')}
          className="cursor-pointer w-full md:w-3/4 h-14 rounded-full border border-gray-500 text-gray-700 font-semibold hover:bg-gray-100">
          Sign in with Email
        </button>
      </div>

      <p className="mt-6 text-xs md:text-sm text-gray-600 text-center md:text-left w-full md:w-3/4">
        By clicking Continue to join or sign in, you agree to LinkedIn's
        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/')}>
          &nbsp;User Agreement
        </span>
        , 
        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/')}>
          &nbsp;Privacy Policy
        </span>
        , and 
        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/')}>
          &nbsp;Cookie Policy
        </span>
        .
      </p>

      <p className="mt-10 text-center md:text-left text-xl">
        New to LinkedIn?{" "}
        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/register')}>
          Join Now
        </span>
      </p>
    </div>
  );
} 