import React from "react";

import { TopELementWIthDrop } from "../components/TopElementWIthDrop";
import { TopELement2 } from "./TopElement2";
import { SearchBox } from "./SearchBox";

import {
  Bell,
  BriefcaseBusiness,
  CircleUserRound,
  Grid3x3,
  Home,
  MessageCircle,
  Workflow,
} from "lucide-react";

export function TopBar2() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/480/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png"
            alt="LinkedIn"
            className="h-14 w-auto"
          />

          <SearchBox />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <TopELement2
            title="Home"
            icon={<Home size={22} />}
          />

          <TopELement2
            title="My Network"
            icon={<Workflow size={22} />}
          />

          <TopELement2
            title="Jobs"
            icon={<BriefcaseBusiness size={22} />}
          />

          <TopELement2
            title="Messaging"
            icon={<MessageCircle size={22} />}
          />

          <TopELement2
            title="Notifications"
            icon={<Bell size={22} />}
          />

          <TopELementWIthDrop
            title="Me"
            icon={<CircleUserRound size={22} />}
          />

          <div className="hidden lg:block h-8 border-l border-gray-300"></div>

          <div className="hidden lg:block">
            <TopELementWIthDrop
              title="For Business"
              icon={<Grid3x3 size={22} />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}