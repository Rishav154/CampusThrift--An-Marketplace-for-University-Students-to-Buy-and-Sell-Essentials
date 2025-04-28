import {Card} from "@/components/ui/card.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";

function Orders() {
    return (
        <>
            <div>
                <h1 className="text-3xl font-bold mb-8">Orders</h1>
                <div className={"flex flex-col gap-5 mx-auto my-10"}>
                    <div className="space-y-8">
                        <div className={"p-4 space-y-4"}>
                            <h2 className={"text-xl font-medium"}>Order Summary</h2>
                        </div>
                        <div className={"grid space-y-1 gap2"}>
                            <Card className={"space-y-2 p-3 shadow-md"}>
                                <div></div>
                                <hr/>
                                <div>
                                    <p className={"flex justify-between sm:justify-start gap-2 items-center px-3"}>
                                        <span className={"font-bold"}>Total:</span>
                                        <span className={"text-sm text-gray-500"}>Rs.599</span>
                                    </p>
                                    <p className={"flex justify-between sm:justify-start gap-2 items-center px-3"}>
                                        <span className={"font-bold"}>Address:</span>
                                        <span className={"text-sm text-gray-500"}>123 Main St, City, Country</span>
                                    </p>
                                    <p className={"flex justify-between sm:justify-start sm:gap-2 items-center px-3"}>
                                        <span className={"font-bold"}>Name:</span>
                                        <span className={"text-sm text-gray-500"}>Rishav Prasad</span>
                                    </p>
                                    <p className={"flex justify-between sm:justify-start sm:gap-2 items-center px-3"}>
                                        <span className={"font-bold"}>Email:</span>
                                        <span className={"text-sm text-gray-500"}>rishav@example.com</span>
                                    </p>
                                    <p className={"flex justify-between sm:justify-start sm:gap-2 items-center px-3"}>
                                        <span className={"font-bold"}>Payment Id:</span>
                                        <span className={"text-sm text-gray-500"}>h654h64h64jh6j4hjhjgj4g6</span>
                                    </p>
                                </div>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="pending"/>
                                    </SelectTrigger>
                                    <SelectContent className={"capitalize"}>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Card>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Orders;