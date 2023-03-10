import { useParams } from "react-router-dom"
import { useState } from "react"
import { BiLike, BiDislike }from "react-icons/bi"
import flower from "../flower/flower.jpeg"
import { FcLike } from "react-icons/fc"
import { RiEmotionUnhappyLine } from "react-icons/ri"



function Forum ({ commentList, usernames, createComment, loggedInStatus, loggedInUserID, titleList, allCommentInteractions, putCommentInteractions }){

    const [maxContentLetter, setMaxContentLetter] = useState(2000)
    const [textareaData, setTextAreaData] = useState("")
    const { titleID } = useParams()

    function getAllInteractionsNames(id){
        let nameList = ""
        if (allCommentInteractions[id - 1].like !== ""|| allCommentInteractions[id - 1].dislike !== "" || allCommentInteractions[id - 1].love !== ""){
            nameList = nameList + allCommentInteractions[id - 1].like
            nameList = nameList + allCommentInteractions[id - 1].dislike
            nameList = nameList + allCommentInteractions[id - 1].love
            return nameList.split(",")
        }
        return nameList

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
            console.log(!allInteractions.includes(loggedInUser.username))
            const data = {
                'id' : id,
                'like' : thecommentInteraction.like + `${loggedInUser.username},`,
            }
           putCommentInteractions(data)
        }else if (loggedInStatus && !thecommentInteraction.like.includes(loggedInUser.username) && allInteractions.includes(loggedInUser.username)){
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
        }else if (loggedInStatus && !thecommentInteraction.dislike.includes(loggedInUser.username) && allInteractions.includes(loggedInUser.username)){
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
        }else if (loggedInStatus && !thecommentInteraction.love.includes(loggedInUser.username) && allInteractions.includes(loggedInUser.username)){
            const data = {
                'id' : id,
                'love' : thecommentInteraction.love + `${loggedInUser.username},`,
                'dislike' : thecommentInteraction.dislike.split(",").filter(each => each !== loggedInUser.username).join(","),
                'like' : thecommentInteraction.like.split(",").filter(each => each !== loggedInUser.username).join(","),
            }
            putCommentInteractions(data)
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
        // text-white sm:flex dark:bg-gray-700 rounded mb-5 md:mx-40 lg:mx-32 xl:mx-72 
       <div className="text-white sm:flex dark:bg-gray-700 rounded mb-5 md:mx-30 lg:mx-32 xl:mx-72 pt-3 sm:pt-0" key={index}>
        {/* rounded-full h-24 w-24 m-3 */}
            <img src={flower} className="rounded-full h-24 w-24 mx-auto sm:m-3"/>
            {/* sm:w-[75%] sm:my-auto sm:grid sm:justify-items gap-16 break-words */}
            <ul className="sm:my-auto sm:grid sm:justify-items gap-16 break-words sm:w-[100%]">
                <ul>
                {/* mr-3 ml-8 sm:pt-6 py-5 */}
                    <li className="text-center sm:pt-6 py-5 sm:mr-24 sm:ml-8 sm:text-start">
                        {each.content}
                    </li>
                </ul>
                <ul className="sm:flex">
                <div className="flex gap-2 justify-center pb-2">
                    <div className="flex gap-2 mt-1">
                        <ul className="flex gap-1">
                            {thecommentInteraction.like !== ""? 
                            <li className="text-xl">
                                {thecommentInteraction.like.split(",").length -1}
                            </li> : <p className="text-xl">0</p>}
                            <li className="pt-1">
                                <BiLike size={20} className="hover:cursor-pointer"  onClick={() => handleLike(each.id)}/>
                            </li>
                        </ul>
                        <ul className="flex gap-1">
                            {thecommentInteraction.dislike !== ""? 
                            <li className="text-xl">
                                {thecommentInteraction.dislike.split(",").length -1}
                            </li> : <p className="text-xl">0</p>}
                            <li className="pt-1">
                                <RiEmotionUnhappyLine size={20} className="hover:cursor-pointer" onClick={() => handleDislike(each.id)}/>
                            </li>
                        </ul>
                        <ul className="flex gap-1">
                            {thecommentInteraction.love !== ""? 
                            <li className="text-xl">
                                {thecommentInteraction.love.split(",").length -1}
                            </li> : <p className="text-xl">0</p>}
                            <li className="pt-1">
                                <FcLike size={20}  className="hover:cursor-pointer" onClick={() => handleLove(each.id)}/>
                            </li>
                        </ul>
                    </div>
                </div>
                    {/* flex pl-20 */}
                    <div className="flex justify-between mx-3 sm:grid sm:grid-cols-3 sm:justify-items sm:w-full">
                    {/* sm:pr-10 sm:mb-5 */}
                        <li className="sm:mb-5 pt-2 sm:justify-self-end">
                            {user.username}
                        </li>
                        {/* pr-3 */}
                        <li className="sm:pr-3  pt-2 sm:justify-self-end">
                            {each.time}
                        </li>
                        {/* pr-3 mb-5 */}
                        <li className=" mb-5 sm:pr-0  pt-2 sm:justify-self-end">
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
            <div className="font-bold mx-10 rounded-lg py-5 mt-2">
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