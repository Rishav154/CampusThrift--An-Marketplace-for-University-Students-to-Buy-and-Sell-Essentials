import Navbar from "@/components/Navbar.jsx";
import {Link} from "react-router-dom"

function Error() {
    return (
        <>
            <Navbar showLoginButton={false}/>
            <div className="flex gap-1 flex-col justify-center items-center w-screen h-screen bg-orange-50">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">404 Page Not Found!</h1>
                <Link to={"/"} className={"underline text-sm sm:text-lg"}>
                    Click here to go to Home Page
                </Link>
            </div>
        </>
    );
}

export default Error;