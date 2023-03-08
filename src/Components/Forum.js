import { useParams } from "react-router-dom"
import { useState } from "react"
import { BiLike, BiDislike }from "react-icons/bi"
import flower from "../flower/flower.jpeg"
import { FcLike } from "react-icons/fc"



function Forum ({ commentList, usernames, createComment, loggedInStatus, loggedInUserID, titleList, allCommentInteractions, putCommentInteractions, createCommentInteractions }){

    const [maxContentLetter, setMaxContentLetter] = useState(2000)
    const [textareaData, setTextAreaData] = useState("")
    const { titleID } = useParams()

    function getAllInteractionsNames(commentId){
        const nameList = []
        nameList.push(allCommentInteractions.like)
        nameList.push(allCommentInteractions.dislike)
        nameList.push(allCommentInteractions.love)
        return nameList.split(",")
    }

    function handleChange(e){
        if (e.target.value.length <= 2000){
            setTextAreaData(e.target.value)
            setMaxContentLetter(2000 - e.target.value.length)
        }
    }



    function handleLike(id){
        const thecommentInteraction = allCommentInteractions.find(each => each.id === id)
        const loggedInUser = usernames.find(each => each.id === loggedInUserID)
        const allInteractions = getAllInteractionsNames(id)
        if (loggedInStatus && !allInteractions.includes(loggedInUser.username)){
            const data = {
                'id' : id,
                'like' : thecommentInteraction.like + `${loggedInUser.username},`,
            }
           putCommentInteractions(data)
        }else if (loggedInStatus && !allCommentInteractions.like.includes(loggedInUser.username) && allInteractions.includes(loggedInUser.username)){
            const data = {
                'id' : id,
                'like' : thecommentInteraction.like + `${loggedInUser.username},`,
                'dislike' : thecommentInteraction.dislike.split(",").filter(each => each !== loggedInUser.username).join(","),
                'love' : thecommentInteraction.love.split(",").filter(each => each !== loggedInUser.username).join(","),
            }
            putCommentInteractions(data)
        }

    }

    function handleDislike(id){
        const thecommentInteraction = allCommentInteractions.find(each => each.id === id)
        const loggedInUser = usernames.find(each => each.id === loggedInUserID)
        const allInteractions = getAllInteractionsNames(id)
        if (loggedInStatus && !allInteractions.includes(loggedInUser.username)){
            const data = {
                'id' : id,
                'dislike' : thecommentInteraction.dislike + `${loggedInUser.username},`
               }
            putCommentInteractions(data) 
        }else if (loggedInStatus && !allCommentInteractions.dislike.includes(loggedInUser.username) && allInteractions.includes(loggedInUser.username)){
            const data = {
                'id' : id,
                'dislike' : thecommentInteraction.dislike + `${loggedInUser.username},`,
                'like' : thecommentInteraction.like.split(",").filter(each => each !== loggedInUser.username).join(","),
                'love' : thecommentInteraction.love.split(",").filter(each => each !== loggedInUser.username).join(","),
            }
            putCommentInteractions(data)
        }
    }

    function handleLove(id){
        const thecommentInteraction = allCommentInteractions.find(each => each.id === id)
        const loggedInUser = usernames.find(each => each.id === loggedInUserID)
        const allInteractions = getAllInteractionsNames(id)
        if (loggedInStatus && !allInteractions.includes(loggedInUser.username)){
            const data = {
                'id' : id,
                'love' : thecommentInteraction.love + `${loggedInUser.username},`
               }
               putCommentInteractions(data)
        }else if (loggedInStatus && !allCommentInteractions.love.includes(loggedInUser.username) && allInteractions.includes(loggedInUser.username)){
            const data = {
                'id' : id,
                'love' : thecommentInteraction.love + `${loggedInUser.username},`,
                'dislike' : thecommentInteraction.dislike.split(",").filter(each => each !== loggedInUser.username).join(","),
                'like' : thecommentInteraction.like.split(",").filter(each => each !== loggedInUser.username).join(","),
            }
            putCommentInteractions(data)
        }
    }
    // function handleUpdateFavourite(userId, titleId, status){
    //     const theUser = usernames.find(each => each.id === userId)
    //     const data = {
    //         'id' : userId,
    //         'favourite' : theUser.favourite + `${titleId},`
    //     }

    async function handleSubmit(e){
        e.preventDefault()
        const today = new Date()
        const title = titleList.find(each => {
            return each.id === parseInt(titleID)})

        const data = {
            'title' : title.title,
            'content' : textareaData,
            'userID' : loggedInUserID,
            'time' : today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        }


        
        await createComment(data)
        await createCommentInteractions()
        setTextAreaData("")
        setMaxContentLetter(2000)
    }

    const commentsOfTitle = commentList.filter(each => each.title === parseInt(titleID))

    const commentNodes = commentsOfTitle.map((each, index) => {
        const thecommentInteraction = allCommentInteractions.find(interaction => interaction.id === each.id)
        const user = usernames.find(user => {
            return user.id === each.userID
        })
       return( 
       <div className="text-white sm:flex dark:bg-gray-700 rounded mb-5 md:mx-40 lg:mx-32 xl:mx-72 " key={index}>
            <img src={flower} className="rounded-full h-24 w-24 m-3"/>
            <ul className="sm:w-[75%] sm:my-auto sm:grid sm:justify-items gap-16 break-words">
                <ul>
                    <li className=" mr-3 ml-8 sm:pt-6 py-5">
                        {each.content}
                    </li>
                </ul>
                <ul className="sm:flex">
                    <div className="sm:flex gap-2">
                        {thecommentInteraction.length > 1? 
                        <li className="text-xl">
                            {thecommentInteraction.like.split(",").length}
                        </li> : 0}
                        <li className="pt-1">
                            <BiLike size={20} className="hover:cursor-pointer"  onClick={() => handleLike(each.id)}/>
                        </li>
                        {thecommentInteraction? 
                        <li className="text-xl">
                            {thecommentInteraction.dislike.split(",").length}
                        </li> : 0}
                        <li className="pt-1">
                            <BiDislike size={20} className="hover:cursor-pointer" onClick={() => handleDislike(each.id)}/>
                        </li>
                        {thecommentInteraction? 
                        <li className="text-xl">
                            {thecommentInteraction.love.split(",").length}
                        </li> : 0}
                        <li className="pt-1">
                            <FcLike size={20}  className="hover:cursor-pointer" onClick={() => handleLove(each.id)}/>
                        </li>
                    </div>
                    <div className="flex pl-20">
                        <li className="sm:pr-10 sm:mb-5 sm:">
                            {user.username}
                        </li>
                        <li className="pr-3">
                            {each.time}
                        </li>
                        <li className="pr-3 mb-5">
                            {each.date}
                        </li>
                    </div>
                </ul>
            </ul>
        </div>
        )
    })

    return (
        <div>
            <div className="font-bold mx-20 rounded-lg py-5 mt-2">
                <h1>{commentNodes}</h1>
            </div>
            {loggedInStatus ? 
            <form className="flex justify-center pt-16 mx-5 md:mx-40 lg:mx-32 xl:mx-72" onSubmit={handleSubmit}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="mx-5 px-4 py-2 my-4 pr-14 bg-white rounded-lg dark:bg-gray-800 flex gap-4">
                        <textarea cols={5} rows={5} onChange={handleChange} value={textareaData} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none" placeholder="Give them some advise!!" />
                        <label className="text-gray-600">{maxContentLetter}</label>
                    </div>
                    <div className="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Comment</button>
                    </div>    
                </div>
            </form>
        : null}
        </div>
    )
}

export default Forum