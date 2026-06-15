import { Search } from "lucide-react";

export function SearchBox() {
  return (
    <>
    <div className="block sm:hidden cursor-pointer">
      <Search size={25} className="text-black" />
    </div>
    <div className="hidden sm:flex items-center gap-2 bg-[#edf3f8] px-3 py-2 rounded-md w-48 md:w-72">
      <Search size={18} className="text-gray-600" />

      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none w-full text-sm"
      />
    </div>
    </>
  );
}