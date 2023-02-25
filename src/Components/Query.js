import { Link } from "react-router-dom"

const Query = () =>{
    return (
        <div className="text-white text-center my-auto text-5xl">
            <h1 className="mb-10">Are You the first time here?</h1>
            <Link to="/introduction">
                <button className="bg-green-500 h-24 w-40 rounded-xl mr-5">Yes</button>
            </Link>
            <Link to="/Signin">
                <button className="bg-red-500 h-24 w-40 rounded-xl ml-5">No</button>
            </Link>

        </div>

    )
}

export default Query