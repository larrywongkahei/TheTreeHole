import { Link } from "react-router-dom"

function LandingPage ({handlePlaying}) {
    return (
        <Link to="/TheTreeHole/query" className="text-white">
            Add some image and logo here
        <button onClick={handlePlaying}>Get in</button>
        </Link>
    )
}

export default LandingPage