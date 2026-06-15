import { ChevronDown } from "lucide-react";

export function TopELementWIthDrop({ icon, title }) {
  return (
    <div className="flex flex-col items-center justify-center px-2 py-1 text-gray-500 hover:text-black cursor-pointer transition-colors">
      {icon}

      <div className="flex items-center gap-1 mt-1">
        <span className="hidden md:block text-xs">
          {title}
        </span>
        <ChevronDown size={14} />
      </div>
    </div>
  );
}