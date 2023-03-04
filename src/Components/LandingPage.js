import { Link } from "react-router-dom"
import Words from "../videos/TreeHole.svg"

function LandingPage ({ handlePlaying }) {
    return (
        <Link to="/query" className="text-black text-center text-2xl mt-16">
        <button onClick={handlePlaying}>Welcome to the <img src={Words} /></button>
        </Link>
    )
}

export default LandingPage