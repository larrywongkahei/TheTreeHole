import { useParams } from "react-router-dom"
import { useState } from "react"
import { CgProfile } from "react-icons/cg"
import flower from "../flower/flower.jpeg"



function Forum ({ commentList, usernames, createComment, loggedInStatus, loggedInUserID, titleList }){

    const [textareaData, setTextAreaData] = useState("")
    const { titleID } = useParams()
    const [currentTime, setCurrentTime] = useState("")
    const [hours, setHours] = useState("")
    const [minutes, setMinutes] = useState("")
    const [seconds, setSeconds] = useState("")

    function handleChange(e){
        setTextAreaData(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        const today = new Date()
        if (today.getHours().length === 1){
            setHours(`0${today.getHours()}`)
        }else{
            setHours(today.getHours())
        }
        if (today.getMinutes().length === 1){
            setMinutes(`0${today.getMinutes()}`)
        }else{
            setMinutes(today.getMinutes())
        }
        if (today.getSeconds().length === 1){
            setSeconds(`0${today.getSeconds()}`)
        }else{
            setSeconds(today.getSeconds())
        }
        setCurrentTime(hours + ':' + minutes + ':' + seconds)
        const title = titleList.find(each => {
            return each.id === parseInt(titleID)})
        const data= {
            'title' : title.title,
            'content' : textareaData,
            'userID' : loggedInUserID,
            'time' : currentTime
        }
        createComment(data)
        setTextAreaData("")
    }

    const commentsOfTitle = commentList.filter(each => each.title === parseInt(titleID))

    const commentNodes = commentsOfTitle.map(each => {
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
                <ul className="sm:flex sm:justify-end ">
                    <li className="sm:pr-10 sm:mb-5 sm:">
                        {user.username}
                    </li>
                    <li className="pr-3">
                        {each.time}
                    </li>
                    <li className="justify-self-end pr-3 mb-5">
                        {each.date}
                    </li>
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