import { Link } from "react-router-dom"

function Introducion(){
    return (
        <div>
            add come introduction here, link to signup page.
            <Link to="/TheTreeHole/signup" >
            <button className="text-white flex ">Sounds good</button>
            </Link>
        </div>
    )
}

export default Introducion