import axios from "axios";
import { Search, X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ConnectionBtn from "./ConnectionBtn";
import { userDataContext } from "../context/UserContext";
import dp from '../assets/dp.jpg'

export function SearchBox() {
  let { serverUrl } = useContext(authDataContext)
  let {userData} = useContext(userDataContext)
  const [activeSearch, setActiveSearch] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchUsersData, setSearchUsersData] = useState([])
  const [click, setClick] = useState(false)

  const handleSearch = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/user/search?q=${searchInput}`, { withCredentials: true })
      // console.log(res.data)
      setSearchUsersData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (searchInput) handleSearch()
  }, [searchInput])

  const openSearch = () => {
    setActiveSearch(true)
    setClick(true)
  }

  const closeSearch = () => {
    setActiveSearch(false)
    setClick(false)
    setSearchInput('')
    setSearchUsersData([])
  }

  return (
    <>
      {!activeSearch && (
        <div onClick={openSearch} className="block md:hidden cursor-pointer">
          <Search size={25} className="text-black" />
        </div>
      )}
      {click && (
        <div className="absolute top-14 md:top-15 left-0 lg:left-26 w-full lg:w-120 bg-white shadow-xl rounded-xl flex flex-col gap-3 p-4 min-h-80 overflow-auto hide-scrollbar">
          {(searchUsersData.length == 0 || searchInput.length == 0)
            ? <div className="text-gray-600 text-xl text-center">{searchInput.length == 0 ? 'Try Searching for' : 'No Result Found!'}</div>
            : searchUsersData.map((user, i) => (
              <div key={i} className="flex items-start justify-between px-4 border-b py-1 border-b-gray-400 rounded-xl">
                <Link to={`/profile/${user.username}`} className="flex gap-3 items-start cursor-pointer">
                  <div className="h-15 w-15 rounded-full">
                    <img src={user.profileImage || dp} alt="" className="w-full h-full bg-cover rounded-full" />
                  </div>
                  <div className="">
                    <h1 className="text-lg font-semibold">{user.firstName + ' ' + user.lastName}</h1>
                    <h3 className="text-gray-600 text-base -mt-1">{user.headline}</h3>
                  </div>
                </Link>
                <div className="">
                  {userData._id != user._id && <ConnectionBtn postAuthorId={user._id} />}
                </div>
              </div>
            ))}
        </div>
      )}
      <div onClick={() => setClick(true)} className={`${activeSearch ? 'flex' : 'hidden'} md:flex items-center justify-center gap-2 bg-gray-200 px-3 py-2 rounded-full w-48 ${click ? 'md:w-120' : 'md:w-72'} relative ${click ? 'border' : ''}`}>
        <Search size={18} className="text-gray-600" />
        <input
          type="text"
          placeholder="Search Users.."
          className="bg-transparent outline-none w-full text-sm"
          value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
        />
        <X
          className={`${click ? '' : 'hidden'} absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer block z-200`}
          size={14}
          onClick={(e) => {
            e.stopPropagation()
            closeSearch()
          }}
        />
      </div>
    </>
  );
}