import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUserLogin} from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import {PuffLoader} from "react-spinners";
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

    return <PuffLoader className="mx-auto mt-20" color="#FF5722" size={60}/>;
}
