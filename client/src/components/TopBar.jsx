import { BriefcaseBusiness, Gamepad2, Rocket, TvMinimalPlay, Users } from "lucide-react";
import { TopELement } from "./TopElement";
import { TopELementWIthRound } from "./TopElementWIthRound";
import { useNavigate } from "react-router-dom";

export function TopBar() {
    const navigate = useNavigate()
    return <div className="flex items-center justify-between h-16 md:h-20 px-4 sm:px-8 md:px-16 lg:px-40 bg-white">
        <div className="flex items-center gap-4">
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsfY4ztnbhoAI-TUGV7csHBL5w4TjF40Gdg&s" 
                alt="LinkedIn" className="h-10 md:h-14 cursor-pointer" onClick={() => navigate('/')} 
            />
        </div>
        
        <div className="flex items-center">
            {/* Desktop / Tablet nav */}
            <div className="hidden md:flex items-center gap-6">
                <TopELement title="Top Content" icon={<Rocket />} />
                <TopELement title="People" icon={<Users />} />
                <TopELement title="Learning" icon={<TvMinimalPlay />} />
                <TopELement title="Jobs" icon={<BriefcaseBusiness />} />
                <TopELement title="Games" icon={<Gamepad2 />} />
            </div>

            <div className="hidden md:block h-10 w-px bg-gray-300 ml-4 mr-6"></div>
            <div className="hidden md:flex gap-2 items-center">
                <TopELementWIthRound title={"Sign in"} filled={false} onClick={() => navigate('/login')} />
                <TopELementWIthRound title={"Join Now"} filled={true} onClick={() => navigate('/register')} />
            </div>

            {/* Mobile small controls */}
            <div className="flex md:hidden items-center gap-3">
                <button onClick={() => navigate('/login')} className="text-sm text-[#0A66C2]">Sign in</button>
                <button onClick={() => navigate('/register')} className="text-sm bg-[#0A66C2] text-white px-3 py-1 rounded">Join</button>
            </div>
        </div>
    </div>
}