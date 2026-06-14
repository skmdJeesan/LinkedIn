import { BriefcaseBusiness, Gamepad2, Rocket, TvMinimalPlay, Users } from "lucide-react";
import { TopELement } from "./TopElement";
import { TopELementWIthRound } from "./TopElementWIthRound";

export function TopBar(){
    return <div className="flex items-center justify-between h-20 px-40 bg-white">
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsfY4ztnbhoAI-TUGV7csHBL5w4TjF40Gdg&s" alt="LinkedIn" className="h-14"/>
        </div>
        <div className="flex items-center">
            <div className="flex items-center gap-8">
                <TopELement title="Top Content" icon={<Rocket />} />
                <TopELement title="People" icon={<Users />} />
                <TopELement title="Learning" icon={<TvMinimalPlay />} />
                <TopELement title="Jobs" icon={<BriefcaseBusiness />} />
                <TopELement title="Games" icon={<Gamepad2 />} />
            </div>

            <div className="h-10 w-px bg-gray-300 ml-4 mr-6"></div>
            <div className="gap-2">
            <TopELementWIthRound title={"Signin"} filled={false}/>
            <TopELementWIthRound title={"Join now"} filled={true}/>
            </div>
        </div>
    </div>
}