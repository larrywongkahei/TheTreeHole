import { useParams } from "react-router-dom"
import { useState } from "react"
import { BiLike, BiDislike }from "react-icons/bi"
import  { FcLike } from "react-icons/fc"
import flower from "../flower/flower.jpeg"



function Forum ({ commentList, usernames, createComment, loggedInStatus, loggedInUserID, titleList, allCommentInteractions, updateCommentInteractions, createCommentInteractions}){

    const [textareaData, setTextAreaData] = useState("")
    const { titleID } = useParams()


    function handleChange(e){
        setTextAreaData(e.target.value)
    }

    function handleLike(id){
        const thecommentInteraction = allCommentInteractions.filter(each => each.id === id)
        if (loggedInStatus){
            const data = {
                'id' : id,
                'like' : thecommentInteraction[0].like += 1,
            }
           updateCommentInteractions(data)
        }

    }

    function handleDislike(id){
        const thecommentInteraction = allCommentInteractions.filter(each => each.id === id)
        if (loggedInStatus){
            const data = {
                'id' : id,
                'dislike' : thecommentInteraction[0].dislike += 1
               }
            updateCommentInteractions(data) 
        }   
    }

    function handleLove(id){
        const thecommentInteraction = allCommentInteractions.filter(each => each.id === id)
        if (loggedInStatus){
            const data = {
                'id' : id,
                'love' : thecommentInteraction[0].love += 1,
               }
               updateCommentInteractions(data)
        }
    }

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
    }

    const commentsOfTitle = commentList.filter(each => each.title === parseInt(titleID))

    const commentNodes = commentsOfTitle.map(each => {
        const thecommentInteraction = allCommentInteractions.find(interaction => interaction.id === each.id)
        const user = usernames.find(user => {
            return user.id === each.userID
        })
       return( 
       <div className="text-white text-center sm:flex dark:bg-gray-700 rounded mb-5 md:mx-40 lg:mx-32 xl:mx-72 ">
            {/* < CgProfile size={90} className="sm:mx-1 sm:mt-1 sm:w-[25%] sm:h-full ml-32 "/> */}
            <img src={flower} className="rounded-full h-48 w-48 m-auto ml-3"/>
            <ul className="sm:w-[75%] sm:my-auto sm:grid sm:justify-items gap-16 break-words">
                <ul>
                    <li className=" mx-3 sm:pt-16 py-5">
                        {each.content}
                    </li>
                </ul>
                <ul className="sm:flex">
                    <div className="sm:flex gap-2">
                        {thecommentInteraction? 
                        <li className="text-xl">
                            {thecommentInteraction.like}
                        </li> : 0}
                        <li className="pt-1" onClick={() => handleLike(each.id)}>
                            <BiLike size={20}/>
                        </li>
                        {thecommentInteraction? 
                        <li className="text-xl">
                            {thecommentInteraction.dislike}
                        </li> : 0}
                        <li className="pt-1" onClick={() => handleDislike(each.id)}>
                            <BiDislike size={20}/>
                        </li>
                        {thecommentInteraction? 
                        <li className="text-xl">
                            {thecommentInteraction.love}
                        </li> : 0}
                        <li className="pt-1" onClick={() => handleLove(each.id)}>
                            <FcLike size={20}/>
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
                    <div className="mx-5 px-4 py-2 my-4 bg-white rounded-lg dark:bg-gray-800">
                        <textarea cols={5} rows={5} onChange={handleChange} value={textareaData} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none" placeholder="Give them some advise!!" />
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