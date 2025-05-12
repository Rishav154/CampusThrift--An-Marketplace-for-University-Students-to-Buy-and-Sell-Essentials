import OrderData from "@/components/OrderData.jsx";
import Navbar from "@/components/Navbar.jsx";
import useErrorLogout from "@/hooks/use-error-logout.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const {handleErrorLogout} = useErrorLogout();

    useEffect(() => {
        const getMyOrders = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-orders-by-user-id`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                const {data} = res.data;
                setOrders(data);
            } catch (error) {
                return handleErrorLogout(error);
            }
        }

        getMyOrders();
    }, []);

    return (
        <>
            <Navbar showLoginButton={false}/>
            <div className={"bg-customOrange w-[90vw] lg:w-[50vw] mx-auto mt-10 sm:my-32 grid gap-3"}>
                <h1 className={"text-2xl font-bold"}>My Orders</h1>
                <div className={"grid gap-3"}>
                    {
                        orders.length === 0 ? <h1>No Orders to Show</h1> : orders.map((order) => (
                            <OrderData key={order._id} {...order} />))
                    }
                </div>

            </div>
        </>
    );
}

export default MyOrders;