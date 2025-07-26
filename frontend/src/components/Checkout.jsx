import CheckoutProduct from "@/components/CheckoutProduct.jsx";
import Navbar from "@/components/Navbar.jsx";
import {Card} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useRazorpay from "@/hooks/use-razorpay.jsx";
import {PuffLoader} from "react-spinners";
import axios from "axios";

function Checkout() {
    const [billingInfo, setBillingInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [product, setProduct] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("online");

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

    const createCODOrder = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/create-cod-order`, {
                    name: billingInfo.name,
                    email: billingInfo.email,
                    phone: billingInfo.phone,
                    address: billingInfo.address,
                    amount: product.price,
                    products: [{id: product._id}]
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

            toast.success("Order placed successfully!");
            navigate('/profile/dashboard/my-orders');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to place order");
        }
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

        if (paymentMethod === "online") {
            toast.error("We're currently upgrading our payment system. Please use Cash on Delivery for now—we'll be back online soon!");
            return;
        }

        if (paymentMethod === "cod") {
            try {
                setIsProcessing(true);
                await createCODOrder();
            } catch (error) {
                console.log(error)
            } finally {
                setIsProcessing(false);
            }
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

            <div className="w-[95%] mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4 max-w-6xl">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Checkout</h1>

                <div className="flex flex-col space-y-6 md:space-y-8">
                    <Card className="p-4 sm:p-6 shadow-md">
                        <h2 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Order Summary</h2>

                        <div className="mb-4 sm:mb-6">
                            <CheckoutProduct/>
                        </div>

                        <hr className="my-3 sm:my-4"/>

                        <div className="space-y-2 mb-3 sm:mb-4">
                            <p className="flex justify-between items-center">
                                <span className="font-semibold text-slate-600">Subtotal:</span>
                                <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold text-slate-600">Platform Fee:</span>
                                <span className="font-bold">₹{platformFee}</span>
                            </p>
                        </div>

                        <hr className="my-3 sm:my-4"/>

                        <p className="flex justify-between items-center text-base sm:text-lg">
                            <span className="font-bold">Total:</span>
                            <span className="font-bold">₹{total.toLocaleString()}</span>
                        </p>
                    </Card>

                    <Card className="p-4 sm:p-6 shadow-md">
                        <h2 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Billing Information</h2>

                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={billingInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 h-10 sm:h-11"
                                />
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={billingInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 h-10 sm:h-11"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="98xxxxxx10"
                                    value={billingInfo.phone}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 h-10 sm:h-11"
                                />
                            </div>

                            <div>
                                <Label htmlFor="address" className="text-sm sm:text-base">Pickup Location</Label>
                                <Textarea
                                    id="address"
                                    rows="3"
                                    placeholder="Enter the pickup location."
                                    value={billingInfo.address}
                                    onChange={handleInputChange}
                                    className="w-full mt-1"
                                />
                            </div>

                            <div className="mt-3 sm:mt-4">
                                <Label className="text-sm sm:text-base font-medium mb-2 block">Payment Method</Label>
                                <RadioGroup
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod}
                                    className="flex flex-col space-y-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="online" id="online"/>
                                        <Label htmlFor="online" className="font-normal text-sm sm:text-base">Online
                                            Payment</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cod" id="cod"/>
                                        <Label htmlFor="cod" className="font-normal text-sm sm:text-base">Cash on
                                            Delivery</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <Button
                            onClick={handlePayment}
                            className="w-full mt-5 sm:mt-6 h-12 text-base sm:text-lg"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center gap-2">
                                    <PuffLoader color="white" size={24}/>
                                    <span>Processing...</span>
                                </div>
                            ) : paymentMethod === "cod" ? "Place Order (COD)" : "Proceed to Payment"}
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Checkout;