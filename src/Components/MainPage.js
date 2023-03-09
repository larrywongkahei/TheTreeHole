import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MdOutlineAddBox } from "react-icons/md"
import flower from "../flower/flower.jpeg"
import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr"


function Mainpage({ createTitle, titleList, createComment, commentList, createPrivateTitles, loggedInUserID, usernames, createCommentInteractions, handleAddFavouriteToUser, handleRemoveFavouriteFromUser }) {

    const [showTitleForm, setShowTitleForm] = useState(false)
    const [textAreaData, setTextAreaData] = useState("")
    const [keepPrivate, setKeepPrivate] = useState(true)
    const [title, setTitle] = useState("")
    const [totalPage, setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [titleListToShow, setTitleListToShow] = useState(titleList.slice(0, 5))
    const [maxLetter, setMaxLetter] = useState(23)
    const [maxContentLetter, setMaxContentLetter] = useState(2000)
    const theUserFavourite = usernames.find(each => each.id === loggedInUserID).favourite
    const theUserFavouriteList = theUserFavourite.split(",")

    useEffect(() => {
        updatePage()
        setTotalPage(Math.ceil(titleList.length / 5))
    }, [titleList])

    useEffect(() => {
        if(!usernames){
            return (
                <h1 className="text-5xl text-center pt-40">
                    Loading
                </h1>
            )
        }

    }, [usernames])


    function handleUpdateFavourite(userId, titleId, status){
        const theUser = usernames.find(each => each.id === userId)
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

    function handlePageChange(page){
        setCurrentPage(page)
        if(page !== 1 & page <= totalPage){
            const startPoint = 5 * (page - 1)
            const endPoint = 5 * page
            setTitleListToShow(titleList.slice(startPoint, endPoint))
        }else if (page === 1){
            setTitleListToShow(titleList.slice(0, 5))
        }
    }

    function updatePage(){
        if(currentPage !== 1 & currentPage <= totalPage){
            const startPoint = 5 * (currentPage - 1)
            const endPoint = 5 * currentPage
            setTitleListToShow(titleList.slice(startPoint, endPoint))
        }else if (currentPage === 1){
            setTitleListToShow(titleList.slice(0, 5))
        }
    }

    const allPageNumbersList = []
    for(let i = 1;i <= totalPage; i++){
        allPageNumbersList.push(i)
    }

    function getOnlyFivePage(){
        if (currentPage - 2 <= 1){
            return allPageNumbersList.slice(0, 5)
        }else if (currentPage + 2 >= totalPage){
            return allPageNumbersList.slice(-5)
        }
        return allPageNumbersList.slice(currentPage - 2, currentPage + 2)
    }
    const pageNumbers = getOnlyFivePage().map((each, index) => {
        return (
            <p onClick={() => handlePageChange(each)} className="p-1" key={index}>
                {each}
            </p>
        )
    })

    const titleNodes = titleListToShow.map((each, index) => {
        return (
            <div className="grid justify-items grid-cols-5  dark:bg-gray-700 rounded-md mb-5 lg:mx-60 mx-4" key={index}>
                <div className="sm:my-2 sm:w-full sm:h-full col-span-1 ">
                    <img src={flower} alt="" className="rounded-full h-24 w-24 mx-auto"/>
                </div>
                <ul className="col-span-4 w-full">
                    <li className="font-bold text-2xl font-mono pb-1 pt-3 text-ellipsis overflow-hidden px-4 grid grid-cols-4">
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
            </div>
        )
    })

    function handleTitle(e){
        if (e.target.value.length <= 23){
            setTitle(e.target.value)
            setMaxLetter(23 - e.target.value.length)
        }
    }

    function handleContent(e){
        if (e.target.value.length <= 2000){
            setTextAreaData(e.target.value)
            setMaxContentLetter(2000 - e.target.value.length)
        }
    }

    function handlePreviousPage(){
        if(currentPage !== 1){
            handlePageChange(currentPage - 1)
        }
    }

    function handleNextPage(){
        if(currentPage !== totalPage){
            handlePageChange(currentPage + 1)
    }
}


    function handleTitleFunction(){
        setShowTitleForm(!showTitleForm)

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
            await createPrivateTitles(data)
        }else{
            await createTitle(data)
            await createComment(data)
            await createCommentInteractions()
        }
        setTextAreaData("")
        setTitle("")
        setKeepPrivate(true)
        setShowTitleForm(!showTitleForm)
        setMaxLetter(23)
        setMaxContentLetter(2000)
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
                    <div className="mx-5 pl-4 py-2 pr-10 bg-white rounded-b-lg dark:bg-gray-800 flex gap-4">
                        <textarea onChange={handleContent} value={textAreaData} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none pb-32" placeholder="Share Your Story with us"/>
                        <label className="text-gray-600">{maxContentLetter}</label>
                    </div>
                    <div className="flex items-center justify-end px-5 py-2 border-t dark:border-gray-600">    
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
            <div className="flex gap-2 text-gray-800 hover:cursor-pointer mx-auto">    
                <GrCaretPrevious size={20} onClick={handlePreviousPage} className="text-white m-auto"/>
                {pageNumbers}
                <GrCaretNext size={20} onClick={handleNextPage} className="text-white m-auto"/>
            </div>
        </div>
    )
}

export default Mainpage