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
            <h1 className="mb-12 text-2xl sm:text-2xl font-bold text-black mx-18 mt-12 md:text-3xl lg:text-4xl lg:mt-6 lg:mb-20 xl:text-5xl xl:mt-0">Are You the first time here?</h1>
            <Link to="/introduction">
                <button className="bg-green-500 h-16 w-28 rounded-xl mr-5 sm:h-24 sm:w-40 text-xl font-bold sm:text-2xl sm:font-normal lg:h-28 lg:w-46 lg:mr-10 xl:h-36 xl:w-52">Yes</button>
            </Link>
            <Link to="/Signin">
                <button className="bg-red-500 h-16 w-28 rounded-xl ml-5 mb-14 sm:h-24 sm:w-40 text-xl font-bold sm:text-2xl sm:font-normal lg:h-28 lg:w-46 xl:h-36 xl:w-52">No</button>
            </Link>

        </div>

    )
}

export default Query