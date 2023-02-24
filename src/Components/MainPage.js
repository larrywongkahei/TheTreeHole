import React, { useState } from "react"
import { CgProfile } from "react-icons/cg"
import { Link } from "react-router-dom"

function Mainpage({createTitle, titleList, createComment, commentList, createPrivateComments, loggedInUserID, usernames}) {
    const [showTitleForm, setShowTitleForm] = useState(false)
    const [textAreaData, setTextAreaData] = useState("")
    const [keepPrivate, setKeepPrivate] = useState(true)
    const [title, setTitle] = useState("")

    const titleNodes = titleList.map(each => {
        const theComment = commentList.findLast(comment => comment.title === each.id)
        const theUser = usernames.find(user => user.id === each.userID)
        return (
            <div className="sm:flex sm:justify-items-stretch mx-20 dark:bg-gray-700 rounded-md mb-5 md:mx-40 lg:mx-32 xl:mx-72 py-5 md:mx:auto">
                < CgProfile size={90} className="sm:mx-1 sm:mt-2 sm:w-[25%] sm:h-full ml-32"/>
                <ul className="sm:justify-center sm:w-[75%]">
                    <li className="font-bold text-[2rem] font-mono pb-5 justify-self-center pt-3 text-ellipsis overflow-hidden ">
                        <Link to={`/TheTreeHole/forum/${each.id}`}>
                        {each.title}
                        </Link>
                    </li>
                {theComment? 
                <div>
                    <p className="text-gray-200 italic text-ellipsis overflow-hidden px-6 pb-5 sm:h-12 ">
                        {theComment.content}
                    </p>
                    <p>
                        {theUser.username}
                    </p>
                </div>
                    : null}
                </ul>
            </div>
        )
    })

    function handleTitleFunction(){
        setShowTitleForm(!showTitleForm)
    }

    function handleChange(e){
        setTextAreaData(e.target.value)
    }

    function handlePrivate(e){
        if(e.target.value === "true"){
            setKeepPrivate(true)
        }else{
            setKeepPrivate(false)
        }
    }

    async function handleSubmit(e){
        e.preventDefault()
        const data = {
        'title' : title,
        'content' : textAreaData,
        'userID' : loggedInUserID
        }

        if(keepPrivate){
            await createPrivateComments(data)
        }else{
            await createTitle(data)
            await createComment(data)
        }
        setTextAreaData("")
        setTitle("")
        setShowTitleForm(!showTitleForm)
    }

    function handleTitle(e){
        setTitle(e.target.value)
    }

    return (
        <div className="flex flex-col text-center">
             <div>
                <button className="text-white bg-red-500 py-6" onClick={handleTitleFunction}>This button to Add a story</button>
            </div>
            {!showTitleForm ? 
            <div>
                <div>
                    <div className="text-white py-3 sm:mx-20">
                        {titleNodes}
                    </div>
                </div> 
            </div>: null}
            {showTitleForm ? 
            // <div className="m-12 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex justify-center">
            <form onSubmit={handleSubmit} className="pt-16 mx-5 lg:mx-80 md:mx-64">
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="w-full mb-4 border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <p className="w-full px-0 text-sm  border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 mb-2">
                            Do you want to share ?
                        </p>
                        <select onChange={handlePrivate} className="w-20 rounded-md text-center">
                            <option value="true">Private</option>
                            <option value="false">Public</option>
                        </select>
                    </div>
                    <div className="mx-5 px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 border-b border-gray-600">
                        <input type="text" onChange={handleTitle} value={title}  className="w-full py-1 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Enter your title"/>
                    </div>
                    <div className="mx-5 px-4 py-2 mb-4 bg-white rounded-b-lg dark:bg-gray-800">
                        <textarea onChange={handleChange} value={textAreaData} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none" placeholder="Share Your Story with us"/>
                    </div>
                    <div className="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">    
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Submit</button>
                    </div>
                </div>
            </form> 
            // </div>
            : null}
        </div>
    )
}

export default Mainpage