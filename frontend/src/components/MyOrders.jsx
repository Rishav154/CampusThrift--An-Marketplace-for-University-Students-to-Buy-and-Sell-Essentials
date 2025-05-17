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
        <div className="w-full px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">My Orders</h1>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex-grow space-y-4 sm:space-y-8">
                    <div className="space-y-3 sm:space-y-4">
                        <h2 className="text-lg sm:text-xl font-medium">Order Summary</h2>
                        <div className="grid grid-cols-1 gap-6 sm:gap-10 px-2 sm:px-6 md:px-10">
                            {
                                orders.length === 0 ? (
                                    <div className="col-span-full text-center">
                                        <h2 className="text-base sm:text-xl text-gray-500 my-16 sm:my-28">
                                            No Orders to Show
                                        </h2>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order._id} className="w-full">
                                            <OrderData {...order} />
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyOrders;