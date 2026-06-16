
export function PostCard({profilePic,name,title,dateAdded,content,contentPic}){
    return <div className="bg-white">
        <div>
            <img src={profilePic} alt="" />
            <h1>{name}</h1>
            <h5>{title}</h5>
            {dateAdded}
        </div>
        
    </div>
}