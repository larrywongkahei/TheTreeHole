import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MdOutlineAddBox } from "react-icons/md"
import flower from "../flower/flower.jpeg"
import { FcLikePlaceholder, FcLike } from "react-icons/fc"


function Mainpage({ createTitle, titleList, createComment, commentList, createPrivateComments, loggedInUserID, usernames, createCommentInteractions, handleAddFavouriteToUser, handleRemoveFavouriteFromUser }) {

    const [showTitleForm, setShowTitleForm] = useState(false)
    const [textAreaData, setTextAreaData] = useState("")
    const [keepPrivate, setKeepPrivate] = useState(true)
    const [title, setTitle] = useState("")
    const [maxLetter, setMaxLetter] = useState(23)
    const [page, setPage] = useState(1)
    const theUserFavourite = usernames.find(each => each.id === loggedInUserID).favourite
    const theUserFavouriteList = theUserFavourite.split(",")

    useEffect(() => {

        if(!usernames){
            return (
                <h1 className="text-xl text-center pt-40">
                    Loading
                </h1>
            )
        }

    }, [usernames])


    function handleUpdateFavourite(userId, titleId, status){
        const theUser = usernames.find(each => each.id === userId)
        console.log(theUser)
        const data = {
            'id' : userId,
            'favourite' : theUser.favourite + `${titleId},`
        }
        if (status === "add"){
            handleAddFavouriteToUser(data)
        }else{
            handleRemoveFavouriteFromUser(theUser, titleId)
        }
    }

    const titleNodes = titleList.map(each => {
        const theComment = commentList.findLast(comment => comment.title === each.id)
        const theUser = usernames.find(user => user.id === each.userID)
        return (
            <div className="grid justify-items grid-cols-6 grid-rows-3 mx-20 dark:bg-gray-700 rounded-md mb-5 md:mx-40 lg:mx-32 xl:mx-72">
                <div className="sm:mt-2 sm:w-full sm:h-full col-span-2 row-span-2 border-r">
                    <img src={flower} className="rounded-full h-48 w-48 mx-auto"/>
                </div>
                <ul className="col-span-4 row-span-1 w-full">
                    <li className="font-bold text-2xl font-mono pb-5 pt-3 text-ellipsis overflow-hidden border-b px-4 grid grid-cols-4">
                        <div className="my-auto col-span-3">
                            <Link to={`/forum/${each.id}`}>
                            {each.title}
                            </Link>
                        </div>
                        <div className="justify-self-end">
                        {theUserFavouriteList.includes(each.id.toString()) ? 
                        < FcLike size={30} className="justify-self-end m-3 hover:cursor-pointer" onClick={() => handleUpdateFavourite(loggedInUserID, each.id, "remove")}/> 
                        : < FcLikePlaceholder size={30} className="justify-self-end m-3 hover:cursor-pointer" onClick={() => handleUpdateFavourite(loggedInUserID, each.id, "add")}/> }
                        </div>
                    </li>
                </ul>
                    {theComment? 
                    <div className="col-start-3 col-span-4 row-span-2">
                        <p className="text-gray-200 italic breack-words px-6 pb-5 sm:h-12 ">
                            {each.content}
                        </p>
                    </div>
                        : null}
                <p className="col-start-1 col-span-2 pt-6 text-xl font-serif border-r">
                        {theUser.username}
                </p>
            </div>
        )
    })

    function handleTitle(e){
        if (e.target.value.length <= 23){
            setTitle(e.target.value)
            setMaxLetter(23 - e.target.value.length)
        }
    }


    function handleTitleFunction(){
        setShowTitleForm(!showTitleForm)

    }

    function handleChange(e){
        setTextAreaData(e.target.value)

    }

    function handlePrivate(e){
        setKeepPrivate(!keepPrivate)
    }

    async function handleSubmit(e){
        e.preventDefault()
        const today = new Date()
        const data = {
        'title' : title,
        'content' : textAreaData,
        'userID' : loggedInUserID,
        'time' : today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        }

        if(keepPrivate){
            await createPrivateComments(data)
        }else{
            await createTitle(data)
            await createComment(data)
            await createCommentInteractions()
        }
        setTextAreaData("")
        setTitle("")
        setKeepPrivate(true)
        setShowTitleForm(!showTitleForm)
    }

    return (
        <div className="flex flex-col text-center">
             <div className="flex justify-center">
                <button className="text-white py-6 flex gap-4 px-2 mt-3 rounded-full bg-gray-600 bg-opacity-80" onClick={handleTitleFunction}>
                    < MdOutlineAddBox size={35} />
                    <p className="pt-1 font-bold text-md">
                        This button to Add a story
                    </p>
                </button>
            </div>
            {showTitleForm ? 
            <form onSubmit={handleSubmit} className="pt-16 mx-5 lg:mx-80 md:mx-64">
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="w-full mb-4 border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <p className="w-full px-0 text-sm  border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 mb-2">
                            Do you want to share ?
                        </p>
                        <select onChange={handlePrivate} defaultValue="true" className="w-20 rounded-md text-center">
                            <option value="true">Private</option>
                            <option value="false">Public</option>
                        </select>
                    </div>
                    <div className="mx-5 pl-4 pr-10 py-2 bg-white rounded-t-lg dark:bg-gray-800 border-b border-gray-600 flex gap-4">
                        <input type="text" onChange={handleTitle} value={title}  className="w-full py-1 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Enter your title"/>
                        <label className="text-gray-600">{maxLetter}</label>
                    </div>
                    <div className="mx-5 px-4 py-2 mb-4 bg-white rounded-b-lg dark:bg-gray-800">
                        <textarea onChange={handleChange} value={textAreaData} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none" placeholder="Share Your Story with us"/>
                    </div>
                    <div className="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">    
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Submit</button>
                    </div>
                </div>
            </form> :
                <div>
                    <div>
                        <div className="text-white py-3 sm:mx-20">
                            {titleNodes}
                        </div>
                    </div> 
                </div>}
        </div>
    )
}

export default Mainpage