import CheckoutProduct from "@/components/CheckoutProduct.jsx";
import Navbar from "@/components/Navbar.jsx";
import {Card} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useRazorpay from "@/hooks/use-razorpay.jsx";
import {PuffLoader} from "react-spinners";

function Checkout() {
    const [billingInfo, setBillingInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [product, setProduct] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    const {isAuthenticated} = useSelector((state) => state.auth);
    const {generatePayment, verifyPayment} = useRazorpay();

    const navigate = useNavigate();

    useEffect(() => {
        window.setCheckoutProduct = (productData) => {
            setProduct(productData);
        };

        return () => {
            delete window.setCheckoutProduct;
        };
    }, []);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setBillingInfo(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
        const {name, email, phone, address} = billingInfo;

        if (!name.trim()) {
            toast.error("Please enter your full name");
            return false;
        }

        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
            toast.error("Please enter a valid 10-digit phone number");
            return false;
        }

        if (!address.trim()) {
            toast.error("Please enter your pickup location");
            return false;
        }

        return true;
    };

    const handlePayment = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (!validateForm()) {
            return;
        }

        if (product.blacklisted) {
            toast.error("Product isn't available for purchase");
            return;
        }

        try {
            setIsProcessing(true);
            const order = await generatePayment(product.price);
            await verifyPayment(
                order,
                [{id: product._id}],
                billingInfo
            );
            toast.success("Payment successful!");
        } catch (error) {
            toast.error("Payment failed. Please try again.\n" + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const subtotal = product.price || 0;
    const platformFee = 0;
    const total = subtotal + platformFee;

    return (
        <div className="bg-orange-50 min-h-screen">
            <Navbar showLoginButton={false}/>

            <div className="container mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="p-6 shadow-md">
                            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

                            <div className="mb-6">
                                <CheckoutProduct/>
                            </div>

                            <hr className="my-4"/>

                            <div className="space-y-2 mb-4">
                                <p className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-600">Subtotal:</span>
                                    <span className="font-bold">₹{subtotal}</span>
                                </p>
                                <p className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-600">Platform Fee:</span>
                                    <span className="font-bold">₹{platformFee}</span>
                                </p>
                            </div>

                            <hr className="my-4"/>

                            <p className="flex justify-between items-center text-lg">
                                <span className="font-bold">Total:</span>
                                <span className="font-bold">₹{total}</span>
                            </p>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="p-6 shadow-md">
                            <h2 className="text-xl font-medium mb-4">Billing Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={billingInfo.name}
                                        onChange={handleInputChange}
                                        className="w-full mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={billingInfo.email}
                                        onChange={handleInputChange}
                                        className="w-full mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        placeholder="98xxxxxx10"
                                        value={billingInfo.phone}
                                        onChange={handleInputChange}
                                        className="w-full mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="address">Pickup Location</Label>
                                    <Textarea
                                        id="address"
                                        rows="4"
                                        placeholder="Enter the pickup location."
                                        value={billingInfo.address}
                                        onChange={handleInputChange}
                                        className="w-full mt-1"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handlePayment}
                                className="w-full mt-6"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <div className="flex items-center gap-2">
                                        <PuffLoader color="white" size={30}/>
                                        Processing...
                                    </div>) : "Proceed to Payment"}
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;