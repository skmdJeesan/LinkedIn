export function TopELement2({ name, title, icon, flag, onClick, notiCnt, selectedTab }) {
  const showOnSmall = flag === true || flag === "true";
  const isSelected = selectedTab === name;

  const baseClasses = `relative ${showOnSmall ? "" : "hidden"} md:flex flex-col items-center justify-center px-1 sm:px-2 md:px-3 py-1 cursor-pointer transition-all duration-200`;
  const selectedClasses = isSelected ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-black border-b-2 border-transparent hover:border-black';

  return (
    <div onClick={onClick} className={`${baseClasses} ${selectedClasses}`}>
      <div className="flex justify-center">{icon}</div>
      <div className="block text-xs mt-px">
        {title}
      </div>
      {notiCnt > 0 && <div className="absolute flex items-center justify-center text-[8px] w-3.5 h-3.5 text-white bg-red-500 rounded-full top-px right-6">
        {notiCnt}
      </div>}
    </div>
  );
}