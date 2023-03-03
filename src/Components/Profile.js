import { useState } from "react"
import { Link } from "react-router-dom"

function Profile({ privateTitlesList, loggedInUserID, titleList, usernames }){
    
    const [nodesData, setNodesData] = useState()


    const theUserFavourite = usernames.find(each => each.id === loggedInUserID).favourite

    const theUserFavouriteList = theUserFavourite.split(",")

    const privateTitles = privateTitlesList.filter(each => each.userID === loggedInUserID)

    const publicTitles = titleList.filter(each => each.userID === loggedInUserID)

    const favouriteTitle = titleList.filter(each => theUserFavouriteList.includes(each.id.toString()))

    const privateTitlesNodes = privateTitles.map(each => {
        return (
                <ul className="flex flex-col text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white py-5 lg:mx-60 md:mx-12 rounded-lg">
                    <li className="text-2xl border-b mb-5 text-center">
                        {each.privateTitles}
                    </li>
                    <li className="text-lg mx-8">
                        {each.privateComments}
                    </li>
                </ul>
        )
    })

    const publicTitleNodes = publicTitles.map(each => {
        return (
                <ul className=" flex flex-col text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white py-5 lg:mx-80 md:mx-12 rounded-lg text-lg text-center">
                    <Link to={`/forum/${each.id}`}>
                        <li>
                            {each.title}
                        </li>
                    </Link>
                </ul>
        )
    })

    const favouriteTitleNodes = favouriteTitle.map(each => {
        return (
            <ul className=" flex flex-col text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white py-5 lg:mx-80 md:mx-12 rounded-lg text-lg text-center">
                    <Link to={`/forum/${each.id}`}>
                        <li>
                            {each.title}
                        </li>
                    </Link>
                </ul>

        )
    })

    function handleClick(showData){
        switch(showData){
            case "Private":
                setNodesData(privateTitlesNodes)
                break;
            case "Public":
                setNodesData(publicTitleNodes)
                break;
            case "Favourite":
                setNodesData(favouriteTitleNodes);
                break;
        }
    }

    return (
        <div className="">
            <ul className="fixed right-0 w-[15%] bg-black opacity-80 h-full flex flex-col">
                <li>
                    <button className="text-white border-y hover:bg-gray-500 w-full py-16" onClick={() => handleClick("Private")}>Private</button>
                </li>
                <li>
                    <button className="text-white border-b hover:bg-gray-500 w-full py-16" onClick={() => handleClick("Public")}>Public</button>
                </li>
                <li>
                    <button className="text-white border-b hover:bg-gray-500 w-full py-16" onClick={() => handleClick("Favourite")}>Favourite</button>
                </li>
                <li>
                    <button className="text-white border-b hover:bg-gray-500 w-full py-16">Edit Profile</button>
                </li>
            </ul>
            <div className="w-[80%]">
                <div className="flex flex-col gap-5 mt-5 mx-20">
                    {nodesData}
                </div>
            </div>
        </div>
    )
}

export default Profile