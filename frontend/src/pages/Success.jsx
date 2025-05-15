import Navbar from "@/components/Navbar.jsx";
import {Link} from "react-router-dom"
import {useEffect, useState} from "react";

function Success() {

    const [count, setCount] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    setTimeout(() => {
        window.location.href = "/profile/dashboard/my-orders"
    }, 3000)

    return (
        <>
            <Navbar showLoginButton={false}/>
            <div className="flex flex-col justify-center items-center w-screen h-screen bg-orange-50">
                <h1 className="text-3xl sm:text-4xl font-bold">Payment Successful</h1>
                <Link to={"/profile/dashboard/my-orders"} className={"underline text-sm sm:text-lg"}>
                    Go to your Orders (Redirecting you in {count} seconds )
                </Link>
            </div>
        </>
    );
}

export default Success;