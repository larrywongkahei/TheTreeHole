import { useState } from "react"
import { Link } from "react-router-dom"

function Profile({userComments, loggedInUserID, titleList}){
    
    const [nodesData, setNodesData] = useState()

    const privateComments = userComments.filter(each => {
        return each.userID === loggedInUserID
    })

    const publicTitles = titleList.filter(each => {
        return each.userID === loggedInUserID
    })

    const privateCommentsNodes = privateComments.map(each => {
        return (
                <ul className="flex flex-col text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white py-5 rounded-md lg:mx-80 md:mx-12">
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
                <ul className=" flex flex-col text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white py-5 lg:mx-80 md:mx-12">
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
        switch(showData){
            case "Private":
                setNodesData(privateCommentsNodes)
                break;
            case "Public":
                setNodesData(publicTitleNodes)
                break;
            case "Favourite":
                setNodesData("hi");
                break;
        }
    }

    return (
        <div className="">
            <ul className="fixed right-0 w-[20%] pt-16 bg-black h-full">
                <li>
                    <button className="text-white border-y hover:bg-gray-500 w-full py-10" onClick={() => handleClick("Private")}>Private</button>
                </li>
                <li>
                    <button className="text-white border-b hover:bg-gray-500 w-full py-10" onClick={() => handleClick("Public")}>Public</button>
                </li>
                <li>
                    <button className="text-white border-b hover:bg-gray-500 w-full py-10" onClick={() => handleClick("Favourite")}>Favourite</button>
                </li>
                <li>
                    <button className="text-white border-b hover:bg-gray-500 w-full py-10">Edit Profile</button>
                </li>
            </ul>
            <div className="w-[80%]">
                <div className="flex flex-col text-center gap-5 mt-5 mx-20">
                    {nodesData}
                </div>
            </div>
        </div>
    )
}

export default Profile