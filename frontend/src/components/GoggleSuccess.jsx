import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUserLogin} from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import axios from "axios";

export default function GoogleSuccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");

        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/complete-profile`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                const user = res.data.user;

                dispatch(setUserLogin({token, user}));
                localStorage.setItem("token", token);

                if (user.isProfileComplete) {
                    toast.success("Login successful!");
                    navigate("/home");
                } else {
                    toast("Please complete your profile.");
                    navigate("/complete-profile");
                }
            } catch (err) {
                console.error("Fetch user failed:", err);
                toast.error("Login failed.");
                navigate("/login");
            }
        };

        if (token) {
            fetchUser();
        } else {
            toast.error("No token received.");
            navigate("/login");
        }
    }, [dispatch, navigate]);

    return (
        <div className="min-h-screen bg-customOrange flex flex-col items-center justify-center px-4 py-8">
            <div
                className="w-full max-w-md bg-white p-8 rounded-xl border border-gray-800 shadow-lg animate-pulse space-y-6">
                <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-6 bg-gray-300 rounded w-5/6 mx-auto"></div>
                <div className="space-y-4 mt-8">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-300 rounded w-full"></div>
                    ))}
                </div>
                <div className="h-12 bg-gray-400 rounded mt-6 w-full"></div>
            </div>
        </div>
    );
}
