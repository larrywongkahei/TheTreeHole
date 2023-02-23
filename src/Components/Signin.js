import { useState } from "react"
import Typed from "react-typed"
import { CgProfile } from "react-icons/cg"
import { useNavigate } from "react-router-dom"

const SigninPage = ({ Login }) =>{
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const Navigate = useNavigate()


    function reset(){
        setUserName("")
        setPassword("")
    }

    function handleUserName (e) {
        setUserName(e.target.value)
    }

    function handlePassword (e) {
        setPassword(e.target.value)
    }

    async function handleSigninForm (e) {
        e.preventDefault();
        const user = {
            "username" : username,
            "password" : password
        }
        await Login(user)
        reset()
    }
    // <div className=" sm:bg-blue-300 md:bg-yellow-200 lg:bg-red-500 xl:bg-blue-300 2xl:bg-yellow-200"></div>

    return (
        <div>
            <div className="font-bold text-4xl text-white pt-16 text-center">
                <Typed strings={["How's your day?", 'We care about you', '']}
                typeSpeed={100}
                backSpeed={80}
                backDelay={600} 
                loop />
            </div>
            <div className="text-white flex justify-center">
                <CgProfile size={100}/>
            </div>
            <form onSubmit={handleSigninForm} className="flex flex-col items-center pt-12 gap-y-9">
                <input type="text" value={username} onChange={handleUserName} placeholder="Enter Your Username" className="p-2 rounded-full text-center bg-white bg-opacity-40 focus:bg-opacity-50 placeholder:text-white placeholder:italic"/>
                <input type="text" value={password} onChange={handlePassword} placeholder="Enter Your Password" className="p-2 rounded-full text-center bg-white bg-opacity-40 focus:bg-opacity-50 placeholder:text-white placeholder:italic"/>
                <button type="submit" className="rounded-full bg-blue-300 bg-opacity-60  px-6 py-3">SignIn</button>
            </form>
        </div>

    )
}

export default SigninPage