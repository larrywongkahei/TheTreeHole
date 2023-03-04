import { Link } from "react-router-dom"
import Words from "../videos/TreeHole.svg"

function LandingPage ({ handlePlaying }) {
    return (
        <Link to="/query" className="text-gray-700 font-serif text-center text-4xl mt-16">
        <button onClick={handlePlaying}>Welcome to the <img src={Words} /></button>
        </Link>
    )
}

export default LandingPage