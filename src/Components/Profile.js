import { useState } from "react"
import { Link } from "react-router-dom"

function Profile({userComments, loggedInUserID, titleList}){
    
    const [showComment, setShowComment] = useState("")

    const privateComments = userComments.filter(each => {
        return each.userID === loggedInUserID
    })

    const publicTitles = titleList.filter(each => {
        return each.userID === loggedInUserID
    })

    const privateCommentsNodes = privateComments.map(each => {
        return (
                <ul className="text-white flex flex-col bg-red-500 py-5 rounded-md">
                    <li>
                        {each.privateTitles}
                    </li>
                    <li>
                        {each.privateComments}
                    </li>
                </ul>
        )
    })

    const publicTitleNodes = publicTitles.map(each => {
        return (
                <ul className="text-white flex flex-col bg-red-500 py-5 rounded-md">
                    <Link to={`/forum/${each.id}`}>
                        <li>
                            {each.title}
                        </li>
                    </Link>
                    <li>
                        {each.content}
                    </li>
                </ul>
        )
    })

    function handleClick(showData){
        setShowComment(showData)
    }

    return (
        <div>
            <div className="flex justify-center w-screen justify-items-stretch">
                <button className="text-white border-r border-b px-6 w-[50%] h-24 hover:bg-gray-500" onClick={() => handleClick("Private")}>Private</button>
                <button className="text-white border-b px-6 w-[50%] hover:bg-gray-500" onClick={() => handleClick("Public")}>Public</button>
            </div>
            {showComment === "Private" ? 
            <div className="flex flex-col text-center gap-5 mt-5 mx-20">
                {privateCommentsNodes}
            </div>
            : <div className="flex flex-col text-center gap-5 mt-5 mx-20">
                {publicTitleNodes}
            </div>}
        </div>
    )
}

export default Profile