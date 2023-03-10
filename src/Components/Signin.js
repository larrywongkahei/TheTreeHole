import { useState } from "react"
import Typed from "react-typed"
import { CgProfile } from "react-icons/cg"

const SigninPage = ({ Login }) =>{
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")


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

    return (
        <div>
            {/* font-bold text-4xl text-gray-800 pt-12 text-center pb-4 */}
            <div className="font-bold text-3xl text-gray-800 pt-10 text-center pb-7 xl:text-5xl">
                <Typed strings={['Welcome back!', 'Your "security blanket"!']}
                typeSpeed={70}
                backSpeed={70}
                backDelay={1000} 
                loop />
            </div>
            {/* g-gray-800 mx-auto w-[20%] rounded-lg py-4 */}
            <div className="bg-gray-800 mx-auto w-[70%] rounded-lg py-9 sm:w-[48%] md:w-[38%] lg:w-[30%] xl:w-[20%]">
                <div className="text-white flex justify-center">
                    <CgProfile size={100}/>
                </div>
                {/* flex flex-col items-center pt-12 gap-y-9 */}
                <form onSubmit={handleSigninForm} className="flex flex-col items-center pt-12 gap-y-9">
                {/* p-2 rounded-full text-center bg-white bg-opacity-40 focus:bg-opacity-50 placeholder:text-white placeholder:italic" */}
                    <input type="text" value={username} onChange={handleUserName} placeholder="Enter Your Username" className="p-2 rounded-full text-center bg-white bg-opacity-40 focus:bg-opacity-50 placeholder:text-white placeholder:italic"/>
                    <input type="text" value={password} onChange={handlePassword} placeholder="Enter Your Password" className="p-2 rounded-full text-center bg-white bg-opacity-40 focus:bg-opacity-50 placeholder:text-white placeholder:italic"/>
                    <button type="submit" className="rounded-full bg-blue-300 bg-opacity-60  px-6 py-3">SignIn</button>
                </form>
            </div>
        </div>

    )
}

export default SigninPage