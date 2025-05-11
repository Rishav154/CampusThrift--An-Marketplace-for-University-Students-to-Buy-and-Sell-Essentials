import {useDispatch} from "react-redux";
import {setUserLogout} from "@/redux/slices/authSlice.js";
import toast from "react-hot-toast";

const useErrorLogout = () => {
    const dispatch = useDispatch();

    const handleErrorLogout = (error, otherTitle = "Error Occured") => {
        if (error.response.status === 401) {
            dispatch(setUserLogout())
            toast.error("Session Expired.\n Please login again.")
        } else {
            toast.error(`${otherTitle}.\n ${error.response.data.message}`)
        }
    }

    return {handleErrorLogout}
}

export default useErrorLogout;