export function TopELement2({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 sm:px-2 md:px-3 py-1 cursor-pointer text-gray-500 hover:text-black border-b-2 border-transparent hover:border-black transition-all duration-200">
      <div>{icon}</div>

      <div className="hidden md:block text-xs mt-1">
        {title}
      </div>
    </div>
  );
}