import {Card} from "@/components/ui/card.jsx";
import {ArrowDownToLine, IndianRupee} from "lucide-react";

function OrderData({
                       amount = 1000,
                       address = "123 Main St, City, Country",
                       status = "Pending",
                       createdAt = "2023-10-01",
                       updatedAt = "2023-10-02",

                   }) {
    return (
        <>
            <Card className={"grid gap-2 p-2"}>
                <div
                    className="flex flex-col sm:flex-row justify-between items-end sm:items-center border p-3 rounded-lg bg-gray-100">
                    <div className={"flex items-center gap-2"}>
                        <img
                            src={"https://images.pexels.com/photos/30350448/pexels-photo-30350448/free-photo-of-vibrant-ferris-wheel-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"}
                            className={"w-20 h-20 rounded-lg"}/>
                    </div>
                    <div>
                        <h1 className={"font-semibold text-sm sm:text-lg"}>Mechanical keyboard with ghosting keys</h1>
                        <p className="flex text-xs sm:text-md gap-2 sm:gap-2 text-gray-500 my-2 sm:my-0">
                            <span className="font-semibold">
                                Status :{" "}
                                <span className="capitalize">
                                    {status}</span>{" "}
                            </span>
                        </p>
                    </div>
                    <div className={"flex sm:flex-col gap-3 sm:gap-0 mt-2 sm:mt-0 sm:items-center"}>
                        <h2 className={"text-md sm:text-xl font-bold flex items-center"}>
                            <IndianRupee size={18}/>499
                        </h2>
                    </div>
                </div>
                <div className={"flex flex-col sm:flex-row justify-between sm:items-center"}>
                    <span>Ordered On: <span className={"capitalize"}>1 Jan 2025</span></span>
                    <span className={"hover:underline text-sm cursor-pointer flex items-center gap-2"}>
                        <ArrowDownToLine size={15}/>
                        Download Invoice
                    </span>
                </div>
                <hr/>
                <span>Delivery At:<span className={"capitalize"}>05 Jan 2025</span></span>

            </Card>
        </>
    );
}

export default OrderData;