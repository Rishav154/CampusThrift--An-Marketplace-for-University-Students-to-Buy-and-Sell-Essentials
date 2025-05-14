import OrderData from "@/components/OrderData.jsx";
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
            <h1 className="text-3xl font-bold mb-8 ml-3">My Orders</h1>
            <div className="flex flex-col flex-1 overflow-y-auto px-3">
                <div className="flex-grow space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-medium">Order Summary</h2>
                        <div className="grid grid-cols-1 gap-10 px-10">
                            {
                                orders.length === 0 ? (
                                    <div className="col-span-full text-center">
                                        <h2 className="text-xl text-gray-500 my-28">
                                            No Orders to Show
                                        </h2>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <OrderData key={order._id} {...order} />
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default MyOrders;
