import { AuthCard } from "../components/AuthCard";

export default function Login(){
    return <div>
        <div className="px-10 py-6">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsfY4ztnbhoAI-TUGV7csHBL5w4TjF40Gdg&s" alt="LinkedIn" className="h-14"/>
        </div>
        <div className="flex justify-center items-center min-h-screen">
        <AuthCard title={"Sign in"} buttonText={"Sign in"} >
            <input type="email" placeholder="Email" className="border p-3 rounded" />
            <input type="password" placeholder="Password" className="border p-3 rounded" />
        </AuthCard>
        </div>
        </div>
}