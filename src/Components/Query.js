import { Link } from "react-router-dom"
import query from "../videos/query.png"

const Query = () =>{
    return (
        <div className="text-white text-center my-auto sm:mt-30 mt-40">
            <img src={query} className=""
                          style={{
                            height: "130%",
                            width: "100%",
                            top: "0",
                            right: "0",
                            paddingBottom:"120px",
                            position: "fixed",
                            zIndex: "-1",
                            objectFit:"cover",
                          }}/>
            <h1 className="mb-16 text-2xl sm:text-5xl font-bold text-black mx-18 mt-8">Are You the first time here?</h1>
            <Link to="/introduction">
                <button className="bg-green-500 h-12 w-20 rounded-xl mr-5 sm:h-24 sm:w-40 text-xl font-bold sm:text-5xl sm:font-normal">Yes</button>
            </Link>
            <Link to="/Signin">
                <button className="bg-red-500 h-12 w-20 rounded-xl ml-5 mb-14 sm:h-24 sm:w-40 text-xl font-bold sm:text-5xl sm:font-normal">No</button>
            </Link>

        </div>

    )
}

export default Query