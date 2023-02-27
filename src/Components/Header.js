import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { CgProfile } from "react-icons/cg"
import { BiLogOut } from "react-icons/bi"
import { HiOutlineHome } from "react-icons/hi"

function Header ({ loggedInStatus }) {
    const Navigate = useNavigate()

    useEffect(() => {
        
        if(loggedInStatus){
          return Navigate('/home')
      }
    }, [loggedInStatus])

    function handleLogOut(){
        window.location.replace('/TheTreeHole/#/Signin')
        window.location.reload()
    }


    function handleProfile(){
        Navigate("/profile")
    }

    function handleHome(){
        Navigate("/home")
    }

    return (
        <div className="flex font-bold text-xl font-mono bg-black text-white sticky top-0 justify-end py-10">

            {loggedInStatus ? 
            <div>
                <div className="fixed top-0 left-0 p-5">
                    <HiOutlineHome size={40} onClick={handleHome}/>
                </div>
                <div className="fixed top-0 right-0 p-5">
                    < CgProfile size={40} onClick={handleProfile}/>
                </div> 
                <div className="fixed top-0 right-24 py-5">
                    < BiLogOut size={40} onClick={handleLogOut}/>
                </div>
            </div>: null}
        </div>
    )
}

export default Header