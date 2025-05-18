import {Button} from "@/components/ui/button.jsx";
import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Product() {
    const {productName} = useParams();
    const [product, setProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductByName = async () => {
            setIsLoading(true);
            try {
                const formattedName = productName?.split("-").join(" ");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-product-by-name/${formattedName}`);
                const {data} = await res.data;
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductByName();
    }, [productName]);

    const handleBuyNow = () => {
        navigate(`/checkout/${productName}`);
    };

    if (isLoading) {
        return (
            <div className="bg-orange-50 min-h-screen">
                <Navbar showLoginButton={false}/>
                <div className="flex justify-center items-center h-[80vh]">
                    <p className="text-lg">Loading product details...</p>
                </div>
                <Footer/>
            </div>
        );
    }

    return (
        <>
            <div className="bg-orange-50 min-h-screen">
                <Navbar showLoginButton={false}/>
                <main className="w-[92%] max-w-6xl mx-auto my-4 sm:my-10 px-2 sm:px-4">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                        {/* Left Part - Images */}
                        <div className="w-full lg:w-1/2">
                            {/* Main Image */}
                            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] mb-3 sm:mb-4">
                                <img
                                    src={product?.images?.[selectedImage]?.url}
                                    alt="Product"
                                    className="w-full h-full rounded-xl object-cover border dark:border-none"
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                {product?.images?.map(({url, id}, index) => (
                                    <div
                                        key={id}
                                        className={`aspect-square overflow-hidden rounded-xl border cursor-pointer transition-all duration-300 ease-in-out hover:brightness-75 ${
                                            selectedImage === index ? 'ring-2 ring-green-500' : ''
                                        }`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={url}
                                            alt="Product thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Part - Product Details */}
                        <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
                            {/* Product Title and Short Description */}
                            <div className="pb-4 sm:pb-5">
                                <h2 className="font-extrabold text-xl sm:text-2xl capitalize">{product?.name}</h2>
                                <p className="text-sm my-2">{product?.shortDescription}</p>
                            </div>

                            {/* Price */}
                            <div className="py-3 sm:py-5 border-t border-b">
                                <h3 className="font-bold text-xl sm:text-2xl">₹{product?.price?.toLocaleString()}</h3>
                            </div>

                            {/* Product Details */}
                            <div className="py-3 sm:py-5 border-b">
                                <p className="text-base sm:text-lg mt-1">
                                    <span className="font-semibold">Color:</span>{" "}
                                    {product?.color}
                                </p>
                                <p className="text-base sm:text-lg mb-1">
                                    <span className="font-semibold">Category:</span>{" "}
                                    {product?.category}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="py-3 sm:py-5 border-b">
                                <h3 className="font-bold text-lg sm:text-xl">Description</h3>
                                <p className="text-sm sm:text-base my-2">{product?.description}</p>
                            </div>

                            {/* Seller Info */}
                            <h4 className="font-bold text-base sm:text-lg mt-4 mb-2 text-gray-800">Seller:</h4>
                            <div className="flex items-center mb-6 mt-2 gap-3 sm:gap-5">
                                <img
                                    src="https://avatar.iran.liara.run/public"
                                    alt="Seller Profile"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border"
                                />
                                <div>
                                    <h2 className="font-bold text-base sm:text-lg capitalize">
                                        {product?.seller?.fullname?.firstname} {product?.seller?.fullname?.lastname}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Member since {new Date(product?.seller?.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                    })}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-5 mt-4 sm:mt-6">
                                <Button className="rounded-lg text-sm sm:text-base font-semibold h-10 sm:h-12">
                                    Message Seller
                                </Button>
                                <Button
                                    className="rounded-lg text-sm sm:text-base font-semibold h-10 sm:h-12"
                                    onClick={() => navigate(`/seller/${product?.seller?._id}`)}
                                >
                                    Seller Profile
                                </Button>
                            </div>

                            {/* Buy Button */}
                            <Button
                                className="bg-green-500 hover:bg-green-500/70 rounded-lg w-full mt-3 sm:mt-5 text-lg sm:text-xl font-bold h-12"
                                onClick={handleBuyNow}
                            >
                                Buy
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default Product;