import { Link } from "react-router-dom"
import query from "../videos/query.png"

const Query = () =>{
    return (
        <div className="text-white text-center my-auto text-5xl sm:mt-60">
            <img src={query} className="pb-18"
                          style={{
                            height: "130%",
                            width: "100%",
                            top: "0",
                            right: "0",
                            padding: "none",
                            position: "fixed",
                            zIndex: "-1",
                            objectFit:"cover",
                          }}/>
            <h1 className="mb-16 text-4xl text-black">Are You the first time here?</h1>
            <Link to="/introduction">
                <button className="bg-green-500 h-24 w-40 rounded-xl mr-5">Yes</button>
            </Link>
            <Link to="/Signin">
                <button className="bg-red-500 h-24 w-40 rounded-xl ml-5 mb-14">No</button>
            </Link>

        </div>

    )
}

export default Query