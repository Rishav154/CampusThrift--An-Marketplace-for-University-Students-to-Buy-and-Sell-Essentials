import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import useErrorLogout from "@/hooks/use-error-logout.jsx";

function CheckoutProduct() {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {productName} = useParams();
    const {handleErrorLogout} = useErrorLogout();

    useEffect(() => {
        const fetchProductByName = async () => {
            if (!productName) return;

            setIsLoading(true);
            try {
                const formattedName = productName.split("-").join(" ");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-product-by-name/${formattedName}`);
                const {data} = await res.data;
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                handleErrorLogout(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductByName();
    }, [productName]);

    useEffect(() => {
        if (window.setCheckoutProduct && !isLoading) {
            window.setCheckoutProduct(product);
        }
    }, [product, isLoading]);

    if (isLoading) {
        return (
            <div className="flex justify-between items-start p-3 rounded-lg bg-gray-200">
                <div className="flex flex-row items-center gap-4">
                    <div className="w-20 sm:w-28 h-20 rounded-lg bg-gray-300 animate-pulse"/>
                    <div className="flex flex-col justify-center w-full">
                        <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse"/>
                        <div className="h-4 w-1/3 bg-gray-300 rounded animate-pulse mt-2"/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-start p-3 rounded-lg bg-gray-200">
            <div className="flex flex-row items-center gap-4">
                <img
                    src={product?.images?.[0]?.url}
                    alt={product.name}
                    className="w-20 sm:w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-center">
                    <h1 className="font-semibold text-sm sm:text-base">
                        {product.name}
                    </h1>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2">
            <span className="font-semibold">
              Price:{" "}
                <span className="font-medium text-gray-500">
                ₹{product.price}
              </span>
            </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CheckoutProduct;