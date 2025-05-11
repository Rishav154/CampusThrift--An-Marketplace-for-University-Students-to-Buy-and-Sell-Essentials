import OrderData from "@/components/OrderData.jsx";

function MyOrders() {
    return (
        <>
            <div className={"bg-customOrange w-[90vw] lg:w-[50vw] mx-auto mt-10 sm:my-32 grid gap-3"}>
                <h1 className={"text-2xl font-bold"}>My Orders</h1>
                <div className={"grid gap-3"}>
                    <OrderData/>
                </div>

            </div>
        </>
    );
}

export default MyOrders;