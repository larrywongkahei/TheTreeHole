import { Link } from "react-router-dom"
import Typed from "react-typed"




function Introducion(){

    return (
        <div>
            <p className="text-center w-[50%] mx-auto font-bold text-lg px-9 pt-2">
                <Typed 
                strings={['According to official statistic,\
                Depression is one of the most prevalent mental health disorders, \
                affecting around 1 in 6 adults in the UK. \
                It is also associated with other mental health issues, such as anxiety, stress and loneliness.\
                The goal of this website is to provide a safe place for people to express themselves AKA The TreeHole.\
                "Tree Hole" is a metaphor in HongKong to discribe a place or a person that you could fully rely on sharing your emotions.\
                We want you to know.\
                You are not alone, we are here for you.']}
                typeSpeed={30}
                className="text-white"
                />
            </p>
            <Link to="/signup" className="flex justify-center pt-10">
            <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-gray-400 ">Sounds good</button>
            </Link>
        </div>
    )
}

export default Introducion