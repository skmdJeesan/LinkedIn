export function TopELement2({title,icon}){
    return <div className="flex items-center flex-col">
        <div> 
            {icon}
        </div>
        <div className="text-xs">
            {title}
        </div>
    </div>
}