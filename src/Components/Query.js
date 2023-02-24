import { Link } from "react-router-dom"

const Query = () =>{
    return (
        <div className="text-white ">
            <h1>Are You the first time here?</h1>
            <Link to="/TheTreeHole/introduction">
                <button>Yes</button>
            </Link>
            <Link to="/TheTreeHole/Signin">
                <button>No</button>
            </Link>

        </div>

    )
}

export default Query