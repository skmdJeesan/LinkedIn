import { AuthCard } from "../components/AuthCard";

export function Register() {
  return (
    <div className="min-h-screen]">
      <div className="px-10 py-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsfY4ztnbhoAI-TUGV7csHBL5w4TjF40Gdg&s"
          alt="LinkedIn"
          className="h-14"
        />
      </div>

      {/* Heading */}
      <h1 className="text-5xl text-center font-light mb-8">
        Join LinkedIn now — it's free!
      </h1>

      {/* Card */}
      <div className="flex justify-center">
        <AuthCard buttonText="Continue">
          {/* Name */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Last Name"
              className="flex-1 border p-3 rounded min-w-0"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded"
          />

          {/* Terms */}
          <p className="text-sm text-gray-600 text-center">
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

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full h-12 border rounded-full flex items-center justify-center gap-3 hover:bg-gray-50"
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
            <span className="text-[#0A66C2] font-semibold cursor-pointer">
              Sign in
            </span>
          </p>
        </AuthCard>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-700">
        Looking to create a page for a business?{" "}
        <span className="text-[#0A66C2] font-semibold cursor-pointer">
          Get help
        </span>
      </div>
    </div>
  );
}