import { useState } from "react"
import Typed from "react-typed"
import { CgProfile } from "react-icons/cg"
import { useNavigate } from "react-router-dom"


const SignupPage = ({ createUser }) => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [image, setImage] = useState()
    const Navigate = useNavigate()


    function reset() {
        setUserName("")
        setEmail("")
        setPassword("")
    }

    // function handleImage(e) {
    //     setImage(e.target.files[0])
    // }

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handleUserName(e) {
        setUserName(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handlePressme(){
        Navigate("/signin")
    }

    async function handleSignupForm(e) {
        e.preventDefault();
        const newUser = {
            "username": username,
            "email": email,
            "password": password,
        }

        if(username && email && password){
            await createUser(newUser)
            reset()
        }else{
            alert("You must fill in all the fields")
        }
        
    }

    return (
            <div className=" mt-5 mx-16 rounded-lg h-100">
                <div className="font-bold text-4xl text-white text-center pb-5">
                    <Typed strings={["How's your day?", 'We care about you', 'You are not alone']}
                    typeSpeed={100}
                    backSpeed={80}
                    backDelay={900} 
                    loop />
                </div>
                <div className="text-white flex justify-center">
                    <CgProfile size={100}/>
                </div>
                    <form onSubmit={handleSignupForm} className="flex flex-col items-center pt-12 gap-y-9" id='form'>
                        <input type="text" value={email} onChange={handleEmail} placeholder="Enter Your Email" className="p-2 rounded-full text-center bg-white bg-opacity-40 focus:bg-opacity-50 placeholder:text-white placeholder:italic" />
                        <input type="text" value={username} onChange={handleUserName} placeholder="Enter Your Username" className="p-2 rounded-full text-center bg-white bg-opacity-40 focus:bg-opacity-50 placeholder:text-white placeholder:italic" />
                        <input type="text" value={password} onChange={handlePassword} placeholder="Enter Your Password" className="p-2 rounded-full text-center bg-white bg-opacity-40 focus:bg-opacity-50 placeholder:text-white placeholder:italic" />
                        <button type="submit" className="rounded-full bg-blue-300 bg-opacity-60  px-6 py-3">Signup</button>
                    </form>
                    <div className="text-white flex justify-center pt-4 gap-2">
                        <p>
                            Have an account?
                        </p>
                        <button onClick={handlePressme}>Press me</button>
                    </div>
            </div>
    )
}

export default SignupPage