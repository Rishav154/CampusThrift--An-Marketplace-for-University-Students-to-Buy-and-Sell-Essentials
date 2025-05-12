import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const useRazorpay = () => {

    const navigate = useNavigate()
    const generatePayment = async (amount) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/generate-payment`,
                {
                    amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
            const data = res.data;
            return data.data;
        } catch (err) {
            return toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const verifyPayment = async (options, productArray, billingInfo) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            return toast.error("Failed to load Razorpay")
        }

        const {address, name, email, phone} = billingInfo;

        const paymentObject = new window.Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            order_id: options.id,
            amount: options.amount,
            currency: "INR",
            name: options.name || "CampusThrift",
            image: "https://res.cloudinary.com/drdakntun/image/upload/v1746984328/CampusThift_sbyzle.png",
            handler: async (response) => {
                try {
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify-payment`,
                        {
                            razorpay_order_id: options.id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            amount: options.amount,
                            address,
                            name,
                            email,
                            phone,
                            productArray,

                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            }
                        })
                    toast.success(res.data.message);
                    navigate("/success");
                } catch (err) {
                    return toast.error(err.response?.data?.message || "Something went wrong");
                }
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }

        })

        paymentObject.open();

    }


    return {generatePayment, verifyPayment};
}

export default useRazorpay;