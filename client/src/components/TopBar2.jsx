import React from 'react'

import { TopELementWIthDrop } from '../components/TopElementWIthDrop'
import { TopELement2 } from './TopElement2'
import { SearchBox } from './SearchBox'
import { Bell, BriefcaseBusiness, CircleUserRound, Grid3x3, Home, MessageCircle, Search, Workflow } from 'lucide-react'

const Feed = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex'>
        <img src="https://static.vecteezy.com/system/resources/previews/018/930/480/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="LinkedIn" height={75}/>
        <SearchBox title={"Search"} icon={<Search />}/>
      </div>
      <div className="flex">
        <TopELement2 title={"Home"} icon={<Home />}/>
        <TopELement2 title={"My network"} icon={<Workflow />}/>
        <TopELement2 title={"Jobs"} icon={<BriefcaseBusiness />}/>
        <TopELement2 title={"Messaging"} icon={<MessageCircle />}/>
        <TopELement2 title={"Notifications"} icon={<Bell />}/>
        <TopELementWIthDrop title={"Anshak Roy"} icon={<CircleUserRound />}/>
        <TopELementWIthDrop title={"For business"} icon={<Grid3x3 />}/>
      </div>
    </div>
  )
}

export default Feed


