import {Card} from "@/components/ui/card.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import OrderProductTile from "@/components/OrderProductTile.jsx";
import {useEffect, useState} from "react";
import useErrorLogout from "@/hooks/use-error-logout.jsx";
import axios from "axios";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";

function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {handleErrorLogout} = useErrorLogout();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/get-all-orders?page=${currentPage}&limit=3`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );

                const {data, totalPages, currentPage: pageFromResponse} = response.data;
                console.log("Seller's orders:", data);
                setOrders(data);
                setTotalPages(totalPages);
                setCurrentPage(pageFromResponse);
            } catch (error) {
                handleErrorLogout(error, error.response?.data?.message);
            }
        }

        fetchOrders();
    }, [currentPage]);

    const updateOrderStatus = async (status, paymentId) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/update-order-status/${paymentId}`,
                {status},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );

            // Refresh orders after status update
            setCurrentPage(currentPage); // This will trigger a re-fetch
        } catch (error) {
            handleErrorLogout(error, error.response?.data?.message);
        }
    }

    // Function to truncate text if it's too long
    const truncateText = (text, maxLength = 25) => {
        if (!text) return "";
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 ml-3">Orders for Your Products</h1>
            <div className="flex flex-col flex-1 overflow-y-auto px-3">
                <div className="flex-grow space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-medium">Order Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                orders.length === 0 ? (
                                    <div className="col-span-full text-center">
                                        <h2 className="text-xl text-gray-500 my-28">
                                            No orders found for your products yet.
                                        </h2>
                                    </div>
                                ) : orders.map((item) => (
                                    <Card key={item._id} className="space-y-2 p-3 shadow-md">
                                        <div className="grid sm:grid-cols-1 gap-2">
                                            {item?.products?.map((product) => (
                                                <OrderProductTile key={product._id} {...product} />
                                            ))}
                                        </div>
                                        <hr className="my-2"/>
                                        <div className="grid space-y-1 gap-2">
                                            <p className="flex justify-between gap-2 items-center px-3">
                                                <span className="font-bold">Total:</span>
                                                <span className="text-sm text-gray-500">₹{item?.amount}</span>
                                            </p>
                                            <div className="flex justify-between gap-2 items-start px-3">
                                                <span className="font-bold">Address:</span>
                                                <span
                                                    className="text-sm text-gray-500 text-right max-w-[65%] break-words">
                                                    {item?.address}
                                                </span>
                                            </div>
                                            <p className="flex justify-between gap-2 items-center px-3">
                                                <span className="font-bold">Name:</span>
                                                <span className="text-sm text-gray-500 text-right truncate max-w-[65%]">
                                                    {item?.name}
                                                </span>
                                            </p>
                                            <p className="flex justify-between gap-2 items-center px-3">
                                                <span className="font-bold">Email:</span>
                                                <span className="text-sm text-gray-500 text-right truncate max-w-[65%]">
                                                    {item?.email}
                                                </span>
                                            </p>
                                            <p className="flex justify-between gap-2 items-center px-3">
                                                <span className="font-bold">Payment Id:</span>
                                                <span className="text-sm text-gray-500 text-right truncate max-w-[65%]">
                                                    {truncateText(item?.razorpayPaymentId, 15)}
                                                </span>
                                            </p>
                                        </div>
                                        <Select onValueChange={(value) => {
                                            if (confirm(`Do you want to change the status to ${value}?`)) {
                                                updateOrderStatus(value, item.razorpayPaymentId);
                                            }
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={item?.status}/>
                                            </SelectTrigger>
                                            <SelectContent className="capitalize">
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="processing">Processing</SelectItem>
                                                <SelectItem value="shipped">Shipped</SelectItem>
                                                <SelectItem value="delivered">Delivered</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-6 self-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={currentPage === index + 1 ? "bg-gray-200" : ""}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
}

export default CustomerOrders;