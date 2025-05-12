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
                // Handle error appropriately
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductByName();
    }, [productName]);

    const handleBuyNow = () => {
        // Navigate to checkout with the product name in the URL
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
                <main
                    className="w-[93vw] lg:w-[70vw] flex flex-col sm:flex-row justify-start items-start gap-10 mx-auto my-10">
                    {/*Left Part*/}
                    <div className="grid sm:w-[50%] gap-3">
                        <img
                            src={product?.images?.[selectedImage]?.url}
                            alt="Product"
                            className="w-full lg:h-[30rem] rounded-xl object-center object-cover border dark:border-none"
                        />

                        {/* Thumbnails (square) */}
                        <div className="grid grid-cols-4 gap-3">
                            {product?.images?.map(({url, id}, index) => (
                                <div
                                    key={id}
                                    className="aspect-square overflow-hidden rounded-xl border dark:border-none cursor-pointer transition-all duration-300 ease-in-out hover:brightness-50"
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={url}
                                        alt="Product"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*Right Part*/}
                    <div className="sm:w-[50%] lg:w-[30%]">
                        <div className="pb-5">
                            <h2 className="font-extrabold text-2xl">{product?.name}</h2>
                            <p className="text-sm my-2">{product?.description}</p>
                        </div>
                        <div className="py-5 border-t border-b">
                            <h3 className="font-bold text-2xl">₹{product?.price}</h3>
                        </div>
                        <div className="py-5 border-b">
                            <h3 className="font-bold text-2xl">Description</h3>
                            <p className="text-base my-2">{product?.description}</p>
                        </div>
                        <div className="flex items-center my-8 gap-5">
                            <img
                                src="https://imgs.search.brave.com/nbCpeiTb2EuR438T9lxPf9scFMTWUEL3jEV0vMOjaRs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzUwLzQzLzM4/LzM2MF9GXzEwNTA0/MzM4MTBfbGZaMUdn/ZkpxS0ZOZ2VyNHJM/QzlvMnNLbktwclRp/YjIuanBn"
                                alt="Seller Profile"
                                className="w-14 h-14 rounded-full object-center object-cover border dark:border-none"
                            />
                            <div className="">
                                <h2 className="font-bold text-xl">Rishav Prasad</h2>
                                <p className="text-sm text-gray-600">Member since March 2025</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 mt-8">
                            <Button className="rounded-lg text-base font-semibold h-12">Message Seller</Button>
                            <Button className="rounded-lg text-base font-semibold h-12">Seller Profile</Button>
                        </div>

                        <Button
                            className="bg-green-500 hover:bg-green-500/70 rounded-lg w-full mt-5 text-xl font-bold h-12"
                            onClick={handleBuyNow}>
                            Buy
                        </Button>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default Product;