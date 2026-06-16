export function ProfileCard({name,title,address,experience,profilePic,banner}){
    return <div className=" bg-white rounded-xl shadow border overflow-hidden">
                <div className="relative">
                
                <img src={banner} alt="" className="h-15 w-full object-cover"/>
                <img src={profilePic} alt="" className="
                    absolute
                    left-5
                    top-full
                    -translate-y-1/2
                    w-20
                    h-20
                    rounded-full
                    border-4
                    border-white
                    object-cover"
                />
                </div>
                <div className="pt-12 px-5 pb-5">
                    <h2 className="font-extrabold text-2xl">
                    {name}
                    </h2>

                    <p className="text-black text-lg">
                    {title}
                    </p>
                    <p className="text-gray-400 text-sm">
                        {address}
                    </p>
                </div>

            </div>
}