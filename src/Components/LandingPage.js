import { Link } from "react-router-dom"

function LandingPage ({ handlePlaying }) {
    return (
        <Link to="/query" className="text-white text-center text-2xl">
        <button onClick={handlePlaying}>Get in</button>
        </Link>
    )
}

export default LandingPage