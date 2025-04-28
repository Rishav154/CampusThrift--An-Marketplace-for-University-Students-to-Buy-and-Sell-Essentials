import CheckoutProduct from "@/components/CheckoutProduct.jsx";
import Navbar from "@/components/Navbar.jsx";
import {Card} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";

function Checkout() {
    return (
        <>
            <div className="bg-orange-50 h-screen">
                <Navbar showLoginButton={false}/>
                <div className="mx-auto w-[90vw] sm:w-[60vw] flex justify-between items-center sm:my-20">
                <div className="flex flex-col gap-5 sm:flex-row mx-auto my-10">
                    <div className="space-y-8">
                        <div className="p-4 space-y-4">
                            <h2 className="text-xl font-medium">Order Summary</h2>
                            <div className="space-x-1 text-3xl lg:min-w-[450px]">
                                <CheckoutProduct />
                            </div>
                            <hr />
                            <div className="p-3 rounded-md">
                                <p className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-600">Subtotal:</span>
                                    <span className="font-bold">Rs.599</span>
                                </p>
                                <p className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-600">Platform Fee:</span>
                                    <span className="font-bold">Rs.0</span>
                                </p>

                            </div>
                            <hr />
                            <p className="flex justify-between items-center px-3">
                                <span className="font-bold">Total:</span>
                                <span className="font-bold">Rs.599</span>
                            </p>

                        </div>
                    </div>
                </div>
                {/*Personal Details*/}
                    <div className="w-[90vw] sm:w-[20vw]">
                        <Card className="p-4 shadow-md space-y-4">
                            <h2 className="text-xl font-medium">Billing Information</h2>
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder={"John Doe"} className="w-full" />
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" placeholder={"your@email.com"} className="w-full" />
                                <Label htmlFor="Address">Pickup Location</Label>
                                <Textarea rows={"7"} id={"address"} placeholder={"Enter the pickup location."} className={"w-full"} />
                            </div>
                            <Button className="w-full">Place Order</Button>
                        </Card>
                    </div>

            </div>
            </div>
        </>
    );
}

export default Checkout;